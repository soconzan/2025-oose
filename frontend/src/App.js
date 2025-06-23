import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import NavBar from './components/NavBar';

// Pages
import MainPage from './pages/MainPage';

// Employee Pages
import EmployeePage from './pages/employee/EmployeesPage';
import RegisterPage from './pages/employee/RegisterEmpPage';
import EmployeeDetailPage from './pages/employee/EmployeeDetailPage';

// Course Pages
import CoursePage from './pages/course/CoursePage';
import RegisterCoursePage from './pages/course/RegisterCoursePage';

// Workspace Pages
import WorkroomMain from './pages/workspace/WorkroomMain';
import WorkroomList from './pages/workspace/WorkroomList';
import WorkroomRegister from './pages/workspace/WorkroomRegister';
import WorkroomAdmin from './pages/workspace/WorkroomAdmin';

// Schedule Pages
import SchedulePage from './pages/schedule/SchedulePage';
import ScheduleDetailPage from './pages/schedule/ScheduleDetailPage';
import RegisterScdPage from './pages/schedule/RegisterScdPage';

function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ padding: '20px' }}>
        <Routes>
          {/* Main Page */}
          <Route path="/" element={<MainPage />} />
          
          {/* Employee Routes */}
          <Route path="/employees" element={<EmployeePage />} />
          <Route path="/employees/register" element={<RegisterPage />} />
          <Route path="/employees/:id" element={<EmployeeDetailPage />} />

          {/* Course Routes */}
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/courses/register" element={<RegisterCoursePage />} />

          {/* Schedule Routes */}
          <Route path="/schedules" element={<SchedulePage />} />
          <Route path="/schedules/:id" element={<ScheduleDetailPage />} />
          <Route path="/schedules/create" element={<RegisterScdPage />} />

          {/* Workspace Routes */}
          <Route path="/workspaces" element={<WorkroomList />} />
          <Route path="/workspaces/create" element={<WorkroomRegister />} />
          <Route path="/workspaces/admin" element={<WorkroomAdmin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
