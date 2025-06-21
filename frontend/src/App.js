import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';

import WorkroomMain from './pages/workspace/WorkroomMain.jsx';
import WorkroomList from './pages/workspace/WorkroomList.jsx';
import WorkroomRegister from './pages/workspace/WorkroomRegister.jsx';
import WorkroomAdmin from './pages/workspace/WorkroomAdmin.jsx';

import EmployeePage from './pages/employee/EmployeesPage';
import RegisterPage from './pages/employee/RegisterEmpPage';
import EmployeeDetailPage from './pages/employee/EmployeeDetailPage';

import SchedulePage from './pages/schedule/SchedulePage';
import ScheduleDetailPage from './pages/schedule/ScheduleDetailPage';
import RegisterScdPage from './pages/schedule/RegisterScdPage';

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        
        <Route path="/employees" element={<EmployeePage />} />
        <Route path="/employees/create" element={<RegisterPage />} />
        <Route path="/employees/:id" element={<EmployeeDetailPage />} />

        <Route path="/schedules" element={<SchedulePage />} />
        <Route path="/schedules/:id" element={<ScheduleDetailPage />} />
        <Route path="/schedules/create" element={<RegisterScdPage />} />
      
        <Route path="/workspace" element={<WorkroomMain />} />
        <Route path="/workspace/list" element={<WorkroomList />} />
        <Route path="/workspace/register" element={<WorkroomRegister />} />
        <Route path="/workspace/admin" element={<WorkroomAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}
