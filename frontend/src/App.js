import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import EmployeesPage from './pages/employee/EmployeesPage';
import RegisterEmpPage from './pages/employee/RegisterEmpPage';
import EmployeeDetailPage from './pages/employee/EmployeeDetailPage';
import CoursePage from './pages/course/CoursePage';
import RegisterCoursePage from './pages/course/RegisterCoursePage';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/employees/register" element={<RegisterEmpPage />} />
          <Route path="/employees/:employeeNum" element={<EmployeeDetailPage />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/courses/register" element={<RegisterCoursePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
