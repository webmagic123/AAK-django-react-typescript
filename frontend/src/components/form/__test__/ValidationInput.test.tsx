import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ValidationInput from '../ValidationInput';

describe('ValidationInput', () => {
  const defaultProps = {
    id: 'test-input',
    name: 'test',
    type: 'text',
    value: '',
    onChange: jest.fn(),
    placeholder: 'Enter test',
    label: 'Test',
    errors: []
  };

  it('renders with default props', () => {
    render(<ValidationInput {...defaultProps} />);

    const input = screen.getByRole('textbox');
    const label = screen.getByText('Test');

    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Enter test');
    expect(input).not.toHaveClass('error');
  });

  it('displays error messages when provide', () => {
    const errors = ['Error 1', 'Error 2'];
    render(<ValidationInput {...defaultProps} errors={errors} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('error');

    errors.forEach(error => {
      expect(screen.getByText(error)).toBeInTheDocument();
      expect(screen.getByText(error)).toHaveClass('error-message');
    });
  });

  it('calls onChange handler when input value changes', () => {
    render(<ValidationInput {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: {value: 'test value'}});

    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('renders different input types correctly', () => {
    const { rerender } = render(<ValidationInput {...defaultProps} type='password' />);

    let input = screen.getByLabelText('Test');
    expect(input).toHaveAttribute('type', 'password');

    rerender(<ValidationInput {...defaultProps} type='email' />);
    input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('applies custom id and name attributes', () => {
    render(<ValidationInput {...defaultProps} id='custom-id' name='custom-name' />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id','custom-id');
    expect(input).toHaveAttribute('name', 'custom-name');
  })

})