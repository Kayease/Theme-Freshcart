import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Basic smoke test to ensure app renders initial loader
describe('App', () => {
  test('renders loading state', () => {
    render(<App />);
    const loadingText = screen.getByText(/loading page/i);
    expect(loadingText).toBeInTheDocument();
  });
});
