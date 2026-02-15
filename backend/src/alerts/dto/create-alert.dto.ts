import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAlertDto {
  @IsOptional()
  @IsNumber()
  companyId?: number;

  @IsArray()
  @IsString({ each: true })
  keywords!: string[];

  @IsEnum(['email', 'sms', 'push'])
  notificationMethod!: 'email' | 'sms' | 'push';

  @IsOptional()
  @IsString()
  alertType?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories?: string[];

  @IsOptional()
  @IsEnum(['NSE', 'BSE', 'BOTH'])
  exchange?: 'NSE' | 'BSE' | 'BOTH';
}
