// src/pages/MainPage.jsx
import React from 'react';
import NavBar from '../components/NavBar';

export default function MainPage() {
  return (

    <div className="app-container">
      <NavBar />
      <main className="main-content">
        <h1 className="main-title">지식 관리 시스템 메인</h1>
        {/* 기존 카드 레이아웃 */}
      </main>

    </div>
  );
}
