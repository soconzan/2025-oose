import React from 'react';
import { Link } from 'react-router-dom';

export default function MainPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">관리 시스템 메인 페이지</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-lg">
        <Link
          to="/employees"
          className="bg-white shadow rounded-lg p-6 text-center hover:bg-gray-50 transition">
          <p className="text-xl font-medium">직원</p>
        </Link>
        <Link
          to="/documents"
          className="bg-white shadow rounded-lg p-6 text-center hover:bg-gray-50 transition">
          <p className="text-xl font-medium">문서</p>
        </Link>
        <Link
          to="/schedules"
          className="bg-white shadow rounded-lg p-6 text-center hover:bg-gray-50 transition">
          <p className="text-xl font-medium">일정</p>
        </Link>
        <Link
          to="/workspace"
          className="bg-white shadow rounded-lg p-6 text-center hover:bg-gray-50 transition">
          <p className="text-xl font-medium">업무방</p>
        </Link>
        <Link
          to="/educations"
          className="bg-white shadow rounded-lg p-6 text-center hover:bg-gray-50 transition">
          <p className="text-xl font-medium">교육</p>
        </Link>
      </div>
    </div>
  );
}
