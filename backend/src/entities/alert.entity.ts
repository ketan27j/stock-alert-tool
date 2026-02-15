import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Index,
} from '@mikro-orm/core';
import { User } from './user.entity';
import { Company } from './company.entity';

@Entity()
export class Alert {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Company, { nullable: true })
  company?: Company;

  @Property({ type: 'text' })
  keywords!: string; // JSON array of keywords

  @Property({ length: 20, default: 'email' })
  notificationMethod: 'email' | 'sms' | 'push' = 'email';

  @Property({ type: 'boolean', default: true })
  @Index()
  active: boolean = true;

  @Property({ length: 50, nullable: true })
  alertType?: string; // 'all', 'specific_company', 'category', 'keyword'

  @Property({ type: 'text', nullable: true })
  categories?: string; // JSON array of categories to watch

  @Property({ length: 10, nullable: true })
  exchange?: 'NSE' | 'BSE' | 'BOTH';

  @Property({ type: 'int', default: 0 })
  triggeredCount: number = 0;

  @Property({ nullable: true })
  lastTriggeredAt?: Date;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(
    user: User,
    keywords: string[],
    notificationMethod: 'email' | 'sms' | 'push',
  ) {
    this.user = user;
    this.keywords = JSON.stringify(keywords);
    this.notificationMethod = notificationMethod;
  }
}
