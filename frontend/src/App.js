import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import EmployeePage from './pages/employee/EmployeesPage' ;
import RegisterPage from './pages/employee/RegisterEmpPage';
import EmployeeDetailPage from './pages/employee/EmployeeDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/employees" element={<EmployeePage />} />
        <Route path="/employees/create" element={<RegisterPage />} />
        <Route path="/employees/:id" element={<EmployeeDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
