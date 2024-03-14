import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { News } from "src/interfaces/news.interface";
import * as NewsAPI from 'newsapi';

@Injectable()
export class NewsService {
    private newsApi = new NewsAPI(process.env.NEWS_API_KEY);
    constructor(@InjectModel('News') private newsModel: Model<News>) {}

    async fetchAndStoreNews(): Promise<void> {
        console.log('Start fetchAndStoreNews');
        let page = 1;
        const pageSize = 20; // Adjust based on the API's maximum allowed value or your preference.
        let totalPages = 1; // Assume there's at least one page to fetch initially.
        try{
            do {
            const response = await this.newsApi.v2.everything({
                q: 'drones',
                language: 'en',
                page: page,
                pageSize: pageSize,
            });
        
            if (page === 1) {
                // Calculate the total pages based on the total results and pageSize.
                // This assumes the API provides a totalResults field.
                totalPages = Math.ceil(response.totalResults / pageSize);
            }
            console.log('Response: ', JSON.stringify(response))
            response.articles.forEach(async (article) => {
                const articleExists = await this.newsModel.findOne({ url: article.url }).exec();
                if (!articleExists) {
                const createNewsDto = {
                    title: article.title,
                    description: article.description,
                    url: article.url,
                    urlToImage: article.urlToImage,
                    author: article.author,
                    publishedAt: new Date(article.publishedAt),
                    content: article.content,
                };
                const newNews = new this.newsModel(createNewsDto);
                await newNews.save();
                }
            });
        
            page++;
            } while (page <= totalPages);
            console.log('Done fetchAndStoreNews');
        } catch(error){
            console.log('Failed to fetch and store news', error);
        }
    }

    async findNews(query: string): Promise<News[]> {
        console.log('Start findNews');
        try{
            // Split the query string into an array of words
            const searchWords = query.split(' ');

            // Create an array of query conditions for each word
            const searchConditions = searchWords.map(word => ({
                content: { $regex: `\\b${word}\\b`, $options: 'i' } // 'i' for case-insensitive search
            }));

            // Use the $or operator to find documents that match any of the conditions
            const articles = await this.newsModel.find({ $or: searchConditions }).sort({ publishedAt: -1 }).exec();
            console.log('Done findNews');
            return articles
        } catch(error){
            console.error('Error in findNews', error);
            throw error;
        }
    }

    async findAll(): Promise<{results: News[], count: number}> {
        console.log('Start findAll');
        try{
            const articles = await this.newsModel.find().sort({ publishedAt: -1 }).exec();
            console.log('Done findAll');
            return { results: articles, count: articles.length };
        } catch(error){
            console.error('Error in findAll', error);
            throw error;
        }
      }
}
