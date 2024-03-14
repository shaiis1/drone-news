// src/features/newsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FilterNews, GetAllNews } from '../apis/newsApi';

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const data = await GetAllNews();
  return data.results;
});

export const filterNews = createAsyncThunk('news/filterNews', async (query?: string) => {
    let url = 'news';
    if(query){
        url += `?q=${encodeURIComponent(query)}`;
    }
    const response = await FilterNews(url);
    return response;
  });

interface NewsState {
  news: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: NewsState = {
  news: [],
  status: 'idle',
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(filterNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(filterNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.news = action.payload;
      })
      .addCase(filterNews.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default newsSlice.reducer;
