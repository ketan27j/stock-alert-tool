import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/mysql';
import { Company } from '../entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: EntityRepository<Company>,
    private readonly em: EntityManager,
  ) {}

  async create(data: Partial<Company>): Promise<Company> {
    const company = this.companyRepo.create({
      symbol: data.symbol!,
      name: data.name!,
      exchange: data.exchange!,
      isActive: data.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    });
    await this.em.persistAndFlush(company);
    return company;
  }

  async findAll(exchange?: 'NSE' | 'BSE'): Promise<Company[]> {
    const where = exchange ? { exchange } : {};
    return this.companyRepo.find(where, {
      orderBy: { name: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companyRepo.findOne({ id });

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return company;
  }

  async findBySymbol(
    symbol: string,
    exchange: 'NSE' | 'BSE',
  ): Promise<Company | null> {
    return this.companyRepo.findOne({ symbol, exchange });
  }

  async search(query: string): Promise<Company[]> {
    return this.companyRepo.find(
      {
        $or: [
          { name: { $like: `%${query}%` } },
          { symbol: { $like: `%${query}%` } },
        ],
      },
      {
        limit: 20,
        orderBy: { name: 'ASC' },
      },
    );
  }

  async update(id: number, data: Partial<Company>): Promise<Company> {
    const company = await this.findOne(id);
    this.companyRepo.assign(company, data);
    await this.em.flush();
    return company;
  }

  async remove(id: number): Promise<void> {
    const company = await this.findOne(id);
    await this.em.removeAndFlush(company);
  }
}
