import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
  Unique,
} from '@mikro-orm/core';
import { Alert } from './alert.entity';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ length: 255 })
  @Unique()
  email!: string;

  @Property({ length: 255 })
  name!: string;

  @Property({ length: 255, hidden: true })
  password!: string;

  @Property({ length: 20, nullable: true })
  phone?: string;

  @Property({ type: 'boolean', default: true })
  isActive: boolean = true;

  @Property({ type: 'boolean', default: false })
  emailVerified: boolean = false;

  @Property({ type: 'boolean', default: false })
  phoneVerified: boolean = false;

  @Property({ nullable: true })
  lastLoginAt?: Date;

  @OneToMany(() => Alert, (alert: Alert) => alert.user)
  alerts = new Collection<Alert>(this);

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(email: string, name: string, password: string) {
    this.email = email;
    this.name = name;
    this.password = password;
  }
}
