// src/wikipedia/wikipedia.service.ts
import { Injectable } from '@nestjs/common';
import wikipedia from 'wikipedia';

@Injectable()
export class WikipediaService {
  async findAuthorInfo(authorName: string): Promise<string> {
    try {
      console.log('Start findAuthorInfo. author: ', authorName)  
      const page = await wikipedia.page(authorName);
      const summary = await page.summary();
      console.log('summary: ', summary) 
      console.log('Done findAuthorInfo. author: ', authorName) 
      return summary.extract;
    } catch (error) {
      console.error(`Failed to find Wikipedia page for ${authorName}`, error);
      throw new Error('Wikipedia page not found for this author');
    }
  }
}
