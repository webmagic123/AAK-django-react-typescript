import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BasicButton from '../BasicButton';

describe('BasicButton', () => {
  const defautProps = {
    isLoading: false,
    loadingText: 'Creating account...',
    defaultText: 'Sign Up',
    className: 'submit-btn'
  }

  it('renders with default props', () => {
    render(<BasicButton {...defautProps} />);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Sign Up');
    expect(button).not.toBeDisabled();
    expect(button).toHaveClass('submit-btn');
  });

  it('shows loading text with when isloading is true', () => {
    render(<BasicButton {...defautProps} isLoading={true} />);
    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Creating account...');
    expect(button).toBeDisabled();
  });

  it('accepts custom className', () => {
    render(<BasicButton {...defautProps} className='custom-btn' />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('custom-btn');
    expect(button).not.toHaveClass('submit-btn');
  });
});