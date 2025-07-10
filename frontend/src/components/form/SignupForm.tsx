import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from 'store/modules/auth/actions';
import { authLoadingSelector, authUserSelector } from 'store/modules/auth/selectors';
import { checkValidation } from 'utils/helper';
import ValidationInput from './ValidationInput';
import BasicButton from './BasicButton';
import { useNavigate } from 'react-router-dom';
import ErrorMessageList from 'components/errors/ErrorMessageList';

const initialFormData: RegisterFormData = {
  username: '',
  email: '',
  password: '',
  confirm_password: '',
  first_name: '',
  last_name: '',
};

const SignupForm: React.FC = () => {
  const user = useSelector(authUserSelector);
  const isLoading = useSelector(authLoadingSelector);

  const [formData, setFromData] = useState<RegisterFormData>(initialFormData);
  const [clientErrors, setClientErrors] = useState<RegisterFormErrors>({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const formErrors: RegisterFormErrors = checkValidation(formData);
    console.log(formErrors)
    setClientErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFromData(prev => ({ ...prev, [name]: value}));

    if (clientErrors[name as keyof RegisterFormData]) {
      setClientErrors(prev => ({ ...prev, [name]: undefined}))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(signup({
        body: formData,
        success: () => {
          navigate('/home');
        },
        fail: () => {
          navigate('/signup');
        }
      }) as any);
    }
  }

  const getFieldErrors = (fieldName: keyof RegisterFormData): string[] => {
    const errors: string[] = [];
    if (clientErrors[fieldName]) {
      errors.push(...clientErrors[fieldName]!);
    }

    if (user?.error?.[fieldName]) {
      errors.push(...user.error[fieldName]);
    }

    return errors;
  }

  return (
    <div className='signup-container'>
      <div className='header-section'>
        <h2>Create Accoutn</h2>
        <ErrorMessageList errors={user?.error?._error || []} />
      </div>
      <form onSubmit={handleSubmit} className='signup-form'>
        <ValidationInput
          id='first_name'
          name='first_name'
          type='text'
          value={formData.first_name}
          onChange={handleChange}
          placeholder='Enter first name'
          label='first name'
          errors={getFieldErrors('first_name') || []}
        />

        <ValidationInput
          id='last_name'
          name='last_name'
          type='text'
          value={formData.last_name}
          onChange={handleChange}
          placeholder='Enter last name'
          label='last name'
          errors={getFieldErrors('last_name') || []}
        />

        <ValidationInput
          id='username'
          name='username'
          type='text'
          value={formData.username}
          onChange={handleChange}
          placeholder='Enter username'
          label='username'
          errors={getFieldErrors('username') || []}
        />

        <ValidationInput
          id='email'
          name='email'
          type='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='Enter email'
          label='email'
          errors={getFieldErrors('email') || []}
        />

        <ValidationInput
          id='password'
          name='password'
          type='password'
          value={formData.password}
          onChange={handleChange}
          placeholder='Enter Password'
          label='password'
          errors={getFieldErrors('password') || []}
        />

        <ValidationInput
          id='confirm_password'
          name='confirm_password'
          type='password'
          value={formData.confirm_password}
          onChange={handleChange}
          placeholder='Confirm Password'
          label='confirm password'
          errors={getFieldErrors('confirm_password') || []}
        />

        <BasicButton
          isLoading={isLoading}
          loadingText='Creating Account...'
          defaultText='Sign Up'
          className='submit-btn'
        />
      </form>
    </div>
  );
};

export default SignupForm;
