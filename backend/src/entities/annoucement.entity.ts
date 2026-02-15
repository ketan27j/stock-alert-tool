import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Index,
} from '@mikro-orm/core';
import { Company } from './company.entity';

@Entity()
export class Announcement {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Company)
  company!: Company;

  @Property({ length: 500 })
  @Index()
  title!: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ type: 'date' })
  @Index()
  announcementDate!: Date;

  @Property({ length: 100, nullable: true })
  @Index()
  category?: string;

  @Property({ length: 50, nullable: true })
  subCategory?: string;

  @Property({ length: 500, nullable: true })
  pdfUrl?: string;

  @Property({ length: 10 })
  @Index()
  exchange!: 'NSE' | 'BSE';

  @Property({ type: 'text', nullable: true })
  attachments?: string; // JSON string of attachment URLs

  @Property({ type: 'boolean', default: false })
  isRead: boolean = false;

  @Property({ type: 'boolean', default: false })
  isImportant: boolean = false;

  @Property({ type: 'text', nullable: true })
  keywords?: string; // JSON array of extracted keywords

  @Property()
  @Index()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(
    company: Company,
    title: string,
    announcementDate: Date,
    exchange: 'NSE' | 'BSE',
  ) {
    this.company = company;
    this.title = title;
    this.announcementDate = announcementDate;
    this.exchange = exchange;
  }
}
