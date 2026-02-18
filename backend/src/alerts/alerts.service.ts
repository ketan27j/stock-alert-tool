import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository, EntityManager } from "@mikro-orm/mysql";
import { Alert } from "../entities/alert.entity";
import { User } from "../entities/user.entity";
import { Company } from "../entities/company.entity";
import { Announcement } from "../entities/announcement.entity";
import { CreateAlertDto } from "./dto/create-alert.dto";

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertRepo: EntityRepository<Alert>,
    @InjectRepository(User)
    private readonly userRepo: EntityRepository<User>,
    @InjectRepository(Company)
    private readonly companyRepo: EntityRepository<Company>,
    private readonly em: EntityManager,
  ) {}

  async create(userId: number, createAlertDto: CreateAlertDto): Promise<Alert> {
    const user = await this.userRepo.findOne(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    let company: Company | null = null;
    if (createAlertDto.companyId) {
      company = await this.companyRepo.findOne(createAlertDto.companyId);
      if (!company) {
        throw new NotFoundException(
          `Company with ID ${createAlertDto.companyId} not found`,
        );
      }
    }

    const alert = this.alertRepo.create({
      user,
      company,
      keywords: JSON.stringify(createAlertDto.keywords),
      notificationMethod: createAlertDto.notificationMethod,
      alertType: createAlertDto.alertType,
      categories: createAlertDto.categories
        ? JSON.stringify(createAlertDto.categories)
        : null,
      exchange: createAlertDto.exchange,
      active: true,
      triggeredCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.em.persistAndFlush(alert);
    return alert;
  }

  async findAllByUser(userId: number): Promise<Alert[]> {
    return this.alertRepo.find(
      { user: userId },
      {
        populate: ["company"],
        orderBy: { createdAt: "DESC" },
      },
    );
  }

  async findOne(id: number, userId: number): Promise<Alert> {
    const alert = await this.alertRepo.findOne(
      { id, user: userId },
      { populate: ["company"] },
    );

    if (!alert) {
      throw new NotFoundException(`Alert with ID ${id} not found`);
    }

    return alert;
  }

  async toggleActive(id: number, userId: number): Promise<Alert> {
    const alert = await this.findOne(id, userId);
    alert.active = !alert.active;
    await this.em.flush();
    return alert;
  }

  async remove(id: number, userId: number): Promise<void> {
    const alert = await this.findOne(id, userId);
    await this.em.removeAndFlush(alert);
  }

  async checkAnnouncementAgainstAlerts(
    announcement: Announcement,
  ): Promise<Alert[]> {
    const alerts = await this.alertRepo.find(
      { active: true },
      { populate: ["user", "company"] },
    );

    const matchedAlerts: Alert[] = [];

    for (const alert of alerts) {
      let isMatch = false;

      // Check company match
      if (alert.company && alert.company.id === announcement.company.id) {
        isMatch = true;
      }

      // Check keywords match
      const keywords = JSON.parse(alert.keywords) as string[];
      const titleLower = announcement.title.toLowerCase();
      const descLower = (announcement.description || "").toLowerCase();

      if (
        keywords.some(
          (kw) =>
            titleLower.includes(kw.toLowerCase()) ||
            descLower.includes(kw.toLowerCase()),
        )
      ) {
        isMatch = true;
      }

      // Check exchange match
      if (
        alert.exchange &&
        alert.exchange !== "BOTH" &&
        alert.exchange !== announcement.exchange
      ) {
        isMatch = false;
      }

      // Check category match
      if (alert.categories) {
        const alertCategories = JSON.parse(alert.categories) as string[];
        if (
          announcement.category &&
          !alertCategories.includes(announcement.category)
        ) {
          isMatch = false;
        }
      }

      if (isMatch) {
        alert.triggeredCount++;
        alert.lastTriggeredAt = new Date();
        matchedAlerts.push(alert);
      }
    }

    if (matchedAlerts.length > 0) {
      await this.em.flush();
    }

    return matchedAlerts;
  }
}
