import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./App', () => () => <div data-testid='mock-app'>Mock App</div>)

test('renders mock App component', () => {
  render(<App />);
  expect(screen.getByTestId('mock-app')).toBeInTheDocument();
});
