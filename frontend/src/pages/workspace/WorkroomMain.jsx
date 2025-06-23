import React from 'react';
import { Link } from 'react-router-dom';

export default function WorkroomMain() {
  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>업무방</h2>
      <ul>
        <li>
          <Link to="/workspace/register">업무 등록</Link>
        </li>
        <li>
          <Link to="/workspace/list">업무 목록</Link>
        </li>
        <li>
          <Link to="/workspace/admin">업무 관리(관리자)</Link>
        </li>
      </ul>
    </div>
  );
}
