import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';
import { Announcement } from '../entities/announcement.entity';
import { Company } from '../entities/company.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AnnouncementScraperService {
  private readonly logger = new Logger(AnnouncementScraperService.name);

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Announcement)
    private readonly announcementRepo: EntityRepository<Announcement>,
    @InjectRepository(Company)
    private readonly companyRepo: EntityRepository<Company>,
  ) {}

  /**
   * Runs every day at 9:00 AM IST
   * Fetches NSE announcements
   */
  @Cron('0 9 * * *', {
    name: 'fetch-nse-announcements',
    timeZone: 'Asia/Kolkata',
  })
  async fetchNSEAnnouncements() {
    this.logger.log('Starting NSE announcement fetch...');
    
    try {
      // Example: Fetch from NSE API or scrape website
      const announcements = await this.fetchFromNSE();
      await this.saveAnnouncements(announcements, 'NSE');
      
      this.logger.log(`Successfully fetched ${announcements.length} NSE announcements`);
    } catch (error) {
      this.logger.error('Error fetching NSE announcements:', error.message);
    }
  }

  /**
   * Runs every day at 9:15 AM IST
   * Fetches BSE announcements
   */
  @Cron('15 9 * * *', {
    name: 'fetch-bse-announcements',
    timeZone: 'Asia/Kolkata',
  })
  async fetchBSEAnnouncements() {
    this.logger.log('Starting BSE announcement fetch...');
    
    try {
      const announcements = await this.fetchFromBSE();
      await this.saveAnnouncements(announcements, 'BSE');
      
      this.logger.log(`Successfully fetched ${announcements.length} BSE announcements`);
    } catch (error) {
      this.logger.error('Error fetching BSE announcements:', error.message);
    }
  }

  /**
   * Runs every 30 minutes during market hours (9:15 AM - 3:30 PM IST)
   * For real-time updates
   */
  @Cron('*/30 9-15 * * 1-5', {
    name: 'fetch-live-announcements',
    timeZone: 'Asia/Kolkata',
  })
  async fetchLiveAnnouncements() {
    this.logger.log('Fetching live announcements...');
    
    try {
      await this.fetchNSEAnnouncements();
      await this.fetchBSEAnnouncements();
    } catch (error) {
      this.logger.error('Error in live fetch:', error.message);
    }
  }

  /**
   * Alternative: Run at fixed intervals
   * This runs every 1 hour (3600000 milliseconds)
   */
  @Interval('fetch-announcements-interval', 3600000)
  async fetchAnnouncementsInterval() {
    this.logger.log('Running interval-based announcement fetch...');
    // Your fetch logic here
  }

  /**
   * Run once when the application starts (after 5 seconds)
   * Useful for initial data load
   */
  @Timeout('initial-fetch', 5000)
  async initialFetch() {
    this.logger.log('Running initial announcement fetch...');
    await this.fetchNSEAnnouncements();
    await this.fetchBSEAnnouncements();
  }

  // Private helper methods
  private async fetchFromNSE(): Promise<any[]> {
    try {
      // Example NSE API endpoint (you'll need to find actual endpoints)
      const url = 'https://www.nseindia.com/api/corporates-corporateActions';
      
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0',
            'Accept': 'application/json',
          },
        }),
      );

      return this.parseNSEData(response.data);
    } catch (error) {
      this.logger.error('NSE fetch error:', error.message);
      return [];
    }
  }

  private async fetchFromBSE(): Promise<any[]> {
    try {
      // Example BSE API endpoint (you'll need to find actual endpoints)
      const url = 'https://api.bseindia.com/BseIndiaAPI/api/AnnSubCategoryGetData/w';
      
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0',
          },
        }),
      );

      return this.parseBSEData(response.data);
    } catch (error) {
      this.logger.error('BSE fetch error:', error.message);
      return [];
    }
  }

  private parseNSEData(data: any): any[] {
    // Parse NSE response format
    // Transform to your internal format
    return data.map(item => ({
      symbol: item.symbol,
      companyName: item.company,
      subject: item.subject,
      announcementDate: new Date(item.date),
      category: item.category,
      pdfUrl: item.attachment,
    }));
  }

  private parseBSEData(data: any): any[] {
    // Parse BSE response format
    return data.Table.map(item => ({
      symbol: item.SCRIP_CD,
      companyName: item.SLONGNAME,
      subject: item.NEWSSUB,
      announcementDate: new Date(item.NEWS_DT),
      category: item.SUBCATNAME,
      pdfUrl: item.ATTACHMENTNAME,
    }));
  }

  private async saveAnnouncements(announcements: any[], exchange: string) {
    for (const ann of announcements) {
      try {
        // Find or create company
        let company = await this.companyRepo.findOne({
          symbol: ann.symbol,
          exchange: exchange,
        });

        if (!company) {
          company = this.companyRepo.create({
            symbol: ann.symbol,
            name: ann.companyName,
            exchange: exchange,
          });
          await this.companyRepo.persistAndFlush(company);
        }

        // Check if announcement already exists
        const exists = await this.announcementRepo.findOne({
          company: company,
          title: ann.subject,
          announcementDate: ann.announcementDate,
        });

        if (!exists) {
          const announcement = this.announcementRepo.create({
            company: company,
            title: ann.subject,
            description: ann.subject, // Could extract from PDF
            announcementDate: ann.announcementDate,
            category: ann.category,
            pdfUrl: ann.pdfUrl,
            exchange: exchange,
          });

          await this.announcementRepo.persistAndFlush(announcement);
          this.logger.log(`Saved new announcement: ${ann.subject}`);
        }
      } catch (error) {
        this.logger.error(`Error saving announcement: ${error.message}`);
      }
    }
  }
}