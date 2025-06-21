import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
  const sections = [
    { name: '직원',      path: '/employees' },
    { name: '문서',      path: '/documents'  },
    { name: '일정',      path: '/schedules'  },
    { name: '업무방',    path: '/workspaces' },
    { name: '교육',      path: '/courses' },
  ];

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {sections.map(sec => (
          <li key={sec.name} className="nav-item">
            <Link to={sec.path} className="nav-link">{sec.name}</Link>
            <ul className="dropdown">
              <li><Link to={`${sec.path}/register`} className="dropdown-link">등록</Link></li>
              <li><Link to={sec.path} className="dropdown-link">조회</Link></li>
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}