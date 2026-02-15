import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { Announcement } from './annoucement.entity';
import { Alert } from './alert.entity';

@Entity()
export class Company {
  @PrimaryKey()
  id!: number;

  @Property({ length: 20 })
  symbol!: string;

  @Property({ length: 255 })
  name!: string;

  @Property({ length: 10 })
  exchange!: 'NSE' | 'BSE';

  @Property({ length: 100, nullable: true })
  sector?: string;

  @Property({ length: 100, nullable: true })
  industry?: string;

  @Property({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  marketCap?: number;

  @Property({ nullable: true })
  isin?: string;

  @Property({ type: 'boolean', default: true })
  isActive: boolean = true;

  @OneToMany(
    () => Announcement,
    (announcement: Announcement) => announcement.company,
  )
  announcements = new Collection<Announcement>(this);

  @OneToMany(() => Alert, (alert) => alert.company)
  alerts = new Collection<Alert>(this);

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(symbol: string, name: string, exchange: 'NSE' | 'BSE') {
    this.symbol = symbol;
    this.name = name;
    this.exchange = exchange;
  }
}
