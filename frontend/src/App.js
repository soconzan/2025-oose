import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import EmployeesPage from './pages/employee/EmployeesPage.jsx';
import DocumentListPage from './pages/document/DocumentListPage';
import DocumentCreatePage from './pages/document/DocumentCreatePage';
import DocumentDetailPage from './pages/document/DocumentDetailPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/employees" element={<EmployeesPage />} />

        <Route path="/documents" element={<DocumentListPage />} />
        <Route path="/documents/new" element={<DocumentCreatePage />} />
        <Route path="/documents/:id" element={<DocumentDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
