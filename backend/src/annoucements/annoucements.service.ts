import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, FilterQuery, EntityManager } from '@mikro-orm/mysql';
import { Announcement } from '../entities/annoucement.entity';
import { Company } from '../entities/company.entity';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { QueryAnnouncementDto } from './dto/query-announcement.dto';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(Announcement)
    private readonly announcementRepo: EntityRepository<Announcement>,
    @InjectRepository(Company)
    private readonly companyRepo: EntityRepository<Company>,
    private readonly em: EntityManager,
  ) {}

  async create(
    createAnnouncementDto: CreateAnnouncementDto,
  ): Promise<Announcement> {
    const company = await this.companyRepo.findOne(
      createAnnouncementDto.companyId,
    );

    if (!company) {
      throw new NotFoundException(
        `Company with ID ${createAnnouncementDto.companyId} not found`,
      );
    }

    const announcement = this.announcementRepo.create({
      ...createAnnouncementDto,
      company,
      isRead: false,
      isImportant: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.em.persistAndFlush(announcement);
    return announcement;
  }

  async findAll(queryDto: QueryAnnouncementDto) {
    const {
      page = 1,
      limit = 20,
      exchange,
      companyId,
      category,
      dateFrom,
      dateTo,
      search,
    } = queryDto;

    const where: FilterQuery<Announcement> = {};

    if (exchange && exchange !== 'ALL') {
      where.exchange = exchange;
    }

    if (companyId) {
      where.company = companyId;
    }

    if (category) {
      where.category = category;
    }

    if (dateFrom || dateTo) {
      where.announcementDate = {};
      if (dateFrom) {
        where.announcementDate.$gte = new Date(dateFrom);
      }
      if (dateTo) {
        where.announcementDate.$lte = new Date(dateTo);
      }
    }

    if (search) {
      where.$or = [
        { title: { $like: `%${search}%` } },
        { description: { $like: `%${search}%` } },
      ];
    }

    const [announcements, total] = await this.announcementRepo.findAndCount(
      where,
      {
        populate: ['company'],
        orderBy: { announcementDate: 'DESC', createdAt: 'DESC' },
        limit,
        offset: (page - 1) * limit,
      },
    );

    return {
      data: announcements,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<Announcement> {
    const announcement = await this.announcementRepo.findOne(
      { id },
      { populate: ['company'] },
    );

    if (!announcement) {
      throw new NotFoundException(`Announcement with ID ${id} not found`);
    }

    return announcement;
  }

  async findLatest(limit: number = 10): Promise<Announcement[]> {
    return this.announcementRepo.find(
      {},
      {
        populate: ['company'],
        orderBy: { announcementDate: 'DESC', createdAt: 'DESC' },
        limit,
      },
    );
  }

  async findByCompany(
    companyId: number,
    limit: number = 50,
  ): Promise<Announcement[]> {
    return this.announcementRepo.find(
      { company: companyId },
      {
        populate: ['company'],
        orderBy: { announcementDate: 'DESC' },
        limit,
      },
    );
  }

  async findByExchange(
    exchange: 'NSE' | 'BSE',
    limit: number = 50,
  ): Promise<Announcement[]> {
    return this.announcementRepo.find(
      { exchange },
      {
        populate: ['company'],
        orderBy: { announcementDate: 'DESC' },
        limit,
      },
    );
  }

  async getCategories(): Promise<string[]> {
    const result = await this.announcementRepo
      .createQueryBuilder()
      .select('DISTINCT category')
      .where({ category: { $ne: null } })
      .execute();

    return (result as Array<{ category: string }>)
      .map((r) => r.category)
      .filter(Boolean);
  }

  async markAsRead(id: number): Promise<Announcement> {
    const announcement = await this.findOne(id);
    announcement.isRead = true;
    await this.em.flush();
    return announcement;
  }

  async markAsImportant(
    id: number,
    isImportant: boolean,
  ): Promise<Announcement> {
    const announcement = await this.findOne(id);
    announcement.isImportant = isImportant;
    await this.em.flush();
    return announcement;
  }

  async remove(id: number): Promise<void> {
    const announcement = await this.findOne(id);
    await this.em.removeAndFlush(announcement);
  }
}
