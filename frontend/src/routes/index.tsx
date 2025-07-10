import React, { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

const HomePage = lazy(() => import('pages/home'));
const RegisterPage = lazy(() => import('pages/register'));

const AppRouter: React.FC = () => (
  <Routes>
    <Route path='/signup' element={<RegisterPage />} />
    <Route path='/home' element={<PrivateRoute><HomePage /></PrivateRoute>} />
    <Route path='*' element={<Navigate to='/home' replace />} />
  </Routes>
)

export default AppRouter;
