import React from 'react';
import '../styles/NewsSearch.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface NewsSearchProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const NewsSearch: React.FC<NewsSearchProps> = ({ query, setQuery }) => {
  return (
    <div className="search-container">
      <h2 className="search-title">Search News</h2>
      <div className="search-box">
        <i className="fa fa-search search-icon"></i>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter news by keyword"
          className="news-search-input"
        />
      </div>
    </div>
  );
};
