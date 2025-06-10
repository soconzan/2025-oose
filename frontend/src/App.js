import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './components/NavBar';
import EmployeePage from './pages/employee/EmployeesPage' ;
import RegisterPage from './pages/employee/RegisterEmpPage';

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/employees" element={<EmployeePage />} />
        <Route path="/employees/create" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/employees" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
