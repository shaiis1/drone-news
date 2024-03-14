import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NewsService } from './news.service';

@Injectable()
export class TasksService {
  constructor(private newsService: NewsService) {}

  @Cron(CronExpression.EVERY_5_MINUTES) // Customize the cron expression based on your needs
  handleCron() {
    console.log('handleCron')
    this.newsService.fetchAndStoreNews()
      .then(() => console.log('News fetched successfully at:', new Date()))
      .catch((error) => console.error('Failed to fetch news:', error));
  }
}