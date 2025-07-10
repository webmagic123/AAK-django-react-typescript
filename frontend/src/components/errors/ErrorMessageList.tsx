import React from 'react'

interface ErrorMessageListProps {
    errors: string[];
}

const ErrorMessageList: React.FC<ErrorMessageListProps> = ({ errors }) => {
  if (!errors || !Array.isArray(errors) || errors.length === 0) {
    return null;
  }

  return (
    <div className='server-error' data-testid='error-list'>
      {
        errors.map((error: string, index: number) => (
          <p key={index}>{error}</p>
        ))
      }
    </div>
  );
};

export default ErrorMessageList;
