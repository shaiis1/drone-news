import React, { useState } from 'react';
import { GetAuthorInfo } from '../apis/newsApi';
import '../styles/NewsList.css'
import { PopUpModal } from './PopUpModal';

interface Article {
  title: string;
  author: string;
  url: string;
  urlToImage: string;
  content: string;
}

interface NewsListProps {
  news: Article[];
}

export const NewsList: React.FC<NewsListProps> = ({ news }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleAuthorClick = async (authorName: string) => {
    try {
        const response = await GetAuthorInfo(authorName)
        if (!response.ok) {
            // Here, check if the response status is not OK (e.g., 500 Internal Server Error)
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch author info');
          }
        const data = await response.text();
        setModalContent(data);
        setIsModalOpen(true);
    } catch (error) {
        console.error('Failed to fetch author info', error);
        setModalContent('Failed to load author information.');
        setIsModalOpen(true);
    }
    };

  return (
    <>
        <ul className='news-container'>
        {news.map((article, index) => (
            <div key={index} className="article-container">
            <div 
                className="article-image" 
                style={{ backgroundImage: `url(${article.urlToImage})` }} 
            />
            <h2 className="article-title">{article.title}</h2>
            <p className="article-author" onClick={() => handleAuthorClick(article.author)}>{article.author}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
                <button className="read-more-button">Read more</button>
            </a>
            <p className="article-content">{article.content}</p>
            </div>
        ))}
        </ul>
        <PopUpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>{modalContent}</p>
      </PopUpModal>
    </>
  );
};

