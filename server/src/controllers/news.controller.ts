import { Controller, Get, Param, Query } from "@nestjs/common";
import { GetNewsDto } from "../dto/get-news.dto";
import { NewsService } from "../services/news.service";
import { WikipediaService } from "src/services/wikipedia.service";

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService, private readonly wikipediaService: WikipediaService) {}

    @Get()
    async getNews(@Query() query: GetNewsDto) {
        return this.newsService.findNews(query.q)
    }

    @Get('getAll')
    getAll() {
       return this.newsService.findAll();
    }

    @Get('author/:name')
    async getAuthorInfo(@Param('name') name: string): Promise<string> {
        return this.wikipediaService.findAuthorInfo(name);
    }
}