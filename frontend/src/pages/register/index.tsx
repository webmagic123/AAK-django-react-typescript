import React from 'react';
import Layout from "components/layout";
import SignupForm from "components/form/SignupForm";

const RegisterPage: React.FC = () => (
  <Layout title="User Registration System">
    <SignupForm />
  </Layout>
);

export default RegisterPage;
