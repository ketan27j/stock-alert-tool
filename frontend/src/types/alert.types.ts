export interface Alert {
  id: string;
  companyId: string;
  threshold: number;
  active?: boolean;
}
