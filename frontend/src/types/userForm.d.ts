interface ValidationInputProps {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label: string;
  errors: string[];
  required?: string;
}

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
}

interface RegisterFormErrors {
  username?: string[];
  email?: string[];
  password?: string[];
  confirm_password?: string[];
  first_name?: string[];
  last_name?: string[];
  _error?: string[];
}