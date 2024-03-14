import { Document } from "mongoose";

export interface News extends Document {
    title: String,
    author: String,
    url: String,
    urlToImage: String,
    publishedAt: Date,
    content: String,
    description: String
}