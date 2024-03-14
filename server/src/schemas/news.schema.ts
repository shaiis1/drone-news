import * as mongoose from 'mongoose';

export const NewsSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    urlToImage: String,
    publishedAt: Date,
    content: {
        type: String,
        text: true
    },
    description: {
        type: String,
        text: true
    }
})