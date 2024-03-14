import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NewsList } from './NewsList';

const mockNews = [
  {
    id: '1',
    title: 'Test Title',
    author: 'Test Author',
    url: 'https://example.com',
    urlToImage: 'https://example.com/image.jpg',
    content: 'Test content'
  }
  // Add more mock news articles as needed
];

describe('NewsList', () => {
  test('renders news articles', () => {
    render(<NewsList news={mockNews} />);
    expect(screen.getByText(/test title/i)).toBeInTheDocument();
    expect(screen.getByText(/test author/i)).toBeInTheDocument();
    expect(screen.getByText(/test content/i)).toBeInTheDocument();
  });

  // Additional tests can be written to simulate clicks on the author name, etc.
});
