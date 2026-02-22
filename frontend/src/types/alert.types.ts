export interface Alert {
  id: number;
  userId: number;
  company?: {
    id: number;
    name: string;
    symbol: string;
  } | null;
  keywords: string[];
  notificationMethod: 'email' | 'sms' | 'push';
  active: boolean;
  alertType?: string;
  categories?: string[];
  exchange?: 'NSE' | 'BSE' | 'BOTH';
  triggeredCount: number;
  lastTriggeredAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAlertDto {
  companyId?: number;
  keywords: string[];
  notificationMethod: 'email' | 'sms' | 'push';
  exchange: 'NSE' | 'BSE' | 'BOTH';
}