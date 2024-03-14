import { unprotectedGetRequest } from "./apiGenerics";

export const GetAllNews = async() => {
    const news = await unprotectedGetRequest('news/getAll');
    return news.json();
}

export const FilterNews = async(url: string) => {
    const news = await unprotectedGetRequest(url);
    return news.json();
}

export const GetAuthorInfo = async(authorName: string) => {
    const info = unprotectedGetRequest(`news/author/${encodeURIComponent(authorName)}`)
    return info
}