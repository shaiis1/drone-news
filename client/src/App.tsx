// src/App.tsx
import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchNews, filterNews } from './app/slices/newsSlice';
import debounce from 'lodash.debounce';
import { NewsList } from './app/components/NewsList';
import { NewsSearch } from './app/components/NewsSearch';
import loadingGif from './assets/loader2.gif';

function App() {
  const dispatch = useAppDispatch();
  const news = useAppSelector((state) => state.news.news);
  const status = useAppSelector((state) => state.news.status);
  const [query, setQuery] = useState('');

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchQuery) => {
      dispatch(filterNews(searchQuery));
    }, 1000),
    [dispatch]
  );

  // Effect to trigger the search
  useEffect(() => {
    if (query === '') {
      dispatch(fetchNews()); // If query is empty, fetch all news
    } else {
      debouncedSearch(query);
    }
  }, [query, debouncedSearch, dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <NewsSearch query={query} setQuery={setQuery} />
        {status === 'loading' && <img src={loadingGif} alt="Loading..." />}
        {status === 'succeeded' && <NewsList news={news} />}
        {status === 'failed' && <p>Failed to load news.</p>}
      </header>
    </div>
  );
}

export default App;
