import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NewsSearch } from './NewsSearch';

describe('NewsSearch', () => {
  test('renders input element', () => {
    render(<NewsSearch query="" setQuery={() => {}} />);
    expect(screen.getByPlaceholderText(/filter news by keyword/i)).toBeInTheDocument();
  });

  test('allows typing in the search input', () => {
    const setQueryMock = jest.fn();
    render(<NewsSearch query="" setQuery={setQueryMock} />);
    const input = screen.getByPlaceholderText(/filter news by keyword/i);
    fireEvent.change(input, { target: { value: 'test' } });
    expect(setQueryMock).toHaveBeenCalledWith('test');
  });
});
