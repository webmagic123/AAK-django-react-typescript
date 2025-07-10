import React from 'react';

const BasicButton: React.FC<BasicButtonProps> = ({
  isLoading,
  loadingText,
  defaultText,
  disabled = false,
  className = ''
}) => {
  return (
    <button
      type="submit"
      disabled={isLoading || disabled}
      className={className}
    >
      {isLoading ? loadingText : defaultText}
    </button>
  );
};

export default BasicButton;
