export interface Company {
  id: number;
  symbol: string;
  name: string;
  exchange: 'NSE' | 'BSE';
  sector?: string;
  createdAt: string;
}

export interface Announcement {
  id: number;
  company: Company;
  title: string;
  description: string;
  announcementDate: string;
  category: string;
  pdfUrl?: string;
  exchange: 'NSE' | 'BSE';
  createdAt: string;
}

export interface AnnouncementFilters {
  exchange?: 'NSE' | 'BSE' | 'ALL';
  companyId?: number;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}