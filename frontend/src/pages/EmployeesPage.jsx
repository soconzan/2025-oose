import React, { useState, useEffect } from 'react';
// import { FaSearch } from 'react-icons/fa';
// import './EmployeeList.css'; // or EmployeeList.module.css, import accordingly
import NavBar from '../components/NavBar';
import '../components/Employee/Employee.css';


export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [deptOptions, setDeptOptions] = useState([]);
  const [posOptions, setPosOptions] = useState([]);
  const [filters, setFilters] = useState({ department: '', position: '', keyword: '' });
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(`/employees?skip=${(page - 1) * limit}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        setEmployees(data.items || data);
        setFiltered(data.items || data);
        setTotal(data.totalCount || (data.items || data).length);
        setDeptOptions([...new Set((data.items || data).map(e => e.departmentId))]);
        setPosOptions([...new Set((data.items || data).map(e => e.position))]);
      });
  }, [page]);

  useEffect(() => {
    let temp = employees;
    if (filters.department) temp = temp.filter(e => e.departmentId == filters.department);
    if (filters.position) temp = temp.filter(e => e.position === filters.position);
    if (filters.keyword) {
      temp = temp.filter(e =>
        e.name.includes(filters.keyword) ||
        e.employeeNum.toString().includes(filters.keyword)
      );
    }
    setFiltered(temp);
  }, [filters, employees]);

  const totalPages = Math.ceil(total / limit);

  return (
    <>
    <NavBar />
    <div className="employee-list-container">
      <h2>직원 조회</h2>
      <div className="filters">
        <select
          value={filters.department}
          onChange={e => setFilters({ ...filters, department: e.target.value })}>
          <option value="">부서</option>
          {deptOptions.map(id => <option key={id} value={id}>부서 {id}</option>)}
        </select>
        <select
          value={filters.position}
          onChange={e => setFilters({ ...filters, position: e.target.value })}>
          <option value="">직급</option>
          {posOptions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
        </select>
        <div className="search-box">
          <input
            type="text"
            placeholder="이름/사번"
            value={filters.keyword}
            onChange={e => setFilters({ ...filters, keyword: e.target.value })}
          />
          {/* <FaSearch className="icon" /> */}
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
            <tr key={emp.employeeId}>
              <td>{emp.employeeNum}</td>
              <td>{emp.name}</td>
              <td>{emp.departmentId}</td>
              <td>{emp.position}</td>
              <td>{emp.userType}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={page === i + 1 ? 'active' : ''}
            onClick={() => setPage(i + 1)}>
            {i + 1}
          </button>
        ))}
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
    </>
  );
}
