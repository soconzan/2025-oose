import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../components/employee/Employee.css';

const DEPT_MAP = {
  101: '기획조정실',
  102: '재정관리국',
  103: '국고국',
  104: '세제실',
  105: '대변인실'
};
const DEPT_OPTIONS = Object.entries(DEPT_MAP).map(([id, name]) => ({ id, name }));

export default function EmployeeList() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({ department: '', position: '', keyword: '' });
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(`/employees?skip=${(page - 1) * limit}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        const items = data.items || data;
        setEmployees(items);
        setFiltered(items);
        setTotal(data.totalCount || items.length);
      });
  }, [page]);

  useEffect(() => {
    let temp = employees;
    if (filters.department) temp = temp.filter(e => String(e.departmentId) === filters.department);
    if (filters.position) temp = temp.filter(e => e.position === filters.position);
    if (filters.keyword) {
      temp = temp.filter(e =>
        e.name.includes(filters.keyword) ||
        e.employeeNum.toString().includes(filters.keyword)
      );
    }
    setFiltered(temp);
  }, [filters, employees]);

  useEffect(() => {
  const params = new URLSearchParams({
    skip: (page - 1) * limit,
    limit: limit,
  });
  if (filters.keyword) {
    params.append('keyword', filters.keyword);
  }

  fetch(`/employees?${params.toString()}`)
    .then(res => res.json())
    .then(data => {
      const items = data.items || data;
      setEmployees(items);
      setFiltered(items);
      setTotal(data.totalCount || items.length);
    });
  }, [page, filters.keyword]); // keyword 변경 시 API 호출


  const totalPages = Math.ceil(total / limit);

  return (
    <div className="employee-list-container">
      <h2>직원 조회</h2>
      <div className="filters">
        <select
          value={filters.department}
          onChange={e => setFilters({ ...filters, department: e.target.value })}>
          <option value="">부서</option>
          {DEPT_OPTIONS.map(opt => (
            <option key={opt.id} value={opt.id}>{opt.name}</option>
          ))}
        </select>
        <select
          value={filters.position}
          onChange={e => setFilters({ ...filters, position: e.target.value })}>
          <option value="">직급</option>
          {[...new Set(employees.map(e => e.position))].map(pos => (
            <option key={pos} value={pos}>{pos}</option>
          ))}
        </select>
        <div className="search-box">
          <input
            type="text"
            placeholder="이름/사번"
            value={filters.keyword}
            onChange={e => setFilters({ ...filters, keyword: e.target.value })}
          />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>사번</th>
            <th>이름</th>
            <th>부서</th>
            <th>직급</th>
            <th>계정 유형</th>
          </tr>
        </thead>
        <tbody>
        {filtered.map(emp => (
          <tr
            key={emp.employeeId}
            onClick={() => navigate(`/employees/${emp.employeeNum}`)}
            style={{ cursor: 'pointer' }}
          >
            <td>{emp.employeeNum}</td>
            <td>{emp.name}</td>
            <td>{DEPT_MAP[emp.departmentId] || emp.departmentId}</td>
            <td>{emp.position}</td>
            <td>{emp.userType}</td>
          </tr>
        ))}
      </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={page === i + 1 ? 'active' : ''}
            onClick={() => setPage(i + 1)}>{i + 1}</button>
        ))}
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
}
