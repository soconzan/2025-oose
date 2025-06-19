import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import EmployeesPage from './pages/EmployeesPage.jsx';

import WorkroomMain from './pages/workspace/WorkroomMain.jsx';
import WorkroomList from './pages/workspace/WorkroomList.jsx';
import WorkroomRegister from './pages/workspace/WorkroomRegister.jsx';
import WorkroomAdmin from './pages/workspace/WorkroomAdmin.jsx'; // 추가!

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/workspace" element={<WorkroomMain />} />
        <Route path="/workspace/list" element={<WorkroomList />} />
        <Route path="/workspace/register" element={<WorkroomRegister />} />
        <Route path="/workspace/admin" element={<WorkroomAdmin />} /> {}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
