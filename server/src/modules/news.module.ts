import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { NewsController } from "src/controllers/news.controller";
import { NewsSchema } from "src/schemas/news.schema";
import { NewsService } from "src/services/news.service";
import { WikipediaService } from "src/services/wikipedia.service";

@Module({
    imports:[MongooseModule.forFeature([{ name: 'News', schema: NewsSchema }])],
    controllers: [NewsController],
    providers: [NewsService, WikipediaService],
    exports: [NewsService]
})
export class NewsModule {}