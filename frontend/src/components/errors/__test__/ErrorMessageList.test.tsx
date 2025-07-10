import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorMessageList from '../ErrorMessageList';

describe('ErrorMessageList', () => {
  it('renders error messages when provided', () => {
    const errors = ['Error 1', 'Error 2'];
    render(<ErrorMessageList errors={errors} />);

    const errorContainer = screen.getByTestId('error-list');
    expect(errorContainer).toHaveClass('server-error');

    errors.forEach(error => {
      expect(screen.getByText(error)).toBeInTheDocument();
    });
  });

  it('returns null when errors array is empyty', () => {
    const { container } = render(<ErrorMessageList errors={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('returns null when errors is null', () => {
    const { container } = render(<ErrorMessageList errors={null as any} />);
    expect(container.firstChild).toBeNull();
  });

  it('returns null when errors is undefined', () => {
    const { container } = render(<ErrorMessageList errors={undefined as any} />);
    expect(container.firstChild).toBeNull();
  })

  it('returns null when errors is not an array', () => {
    const { container } = render(<ErrorMessageList errors={'error' as any} />);
    expect(container.firstChild).toBeNull();
  })
})