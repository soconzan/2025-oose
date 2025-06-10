import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../components/employee/Employee.css';

const DEPT_MAP = {
  101: '기획조정실',
  102: '재정관리국',
  103: '국고국',
  104: '세제실',
  105: '대변인실'
};

export default function EmployeeDetailPage() {
  const { id } = useParams();
  console.log("EmployeeDetailPage id:", id);
  const navigate = useNavigate();
  const [emp, setEmp] = useState(null);

  useEffect(() => {
    fetch(`/employees/${id}`)
      .then(res => res.json())
      .then(data => setEmp(data))
      .catch(() => alert('직원 정보를 불러오는데 실패했습니다.'));
  }, [id]);

  if (!emp) return <p>로딩 중...</p>;

  return (
    <div className="employee-detail-container">
      <button onClick={() => navigate(-1)}>← 목록으로</button>
      <h2>직원 상세 정보</h2>
      <table>
        <tbody>
          <tr><th>사번</th><td>{emp.employeeNum}</td></tr>
          <tr><th>이름</th><td>{emp.name}</td></tr>
          <tr><th>부서</th><td>{DEPT_MAP[emp.departmentId] || emp.departmentId}</td></tr>
          <tr><th>직급</th><td>{emp.position}</td></tr>
          <tr><th>연락처</th><td>{emp.phone}</td></tr>
          <tr><th>이메일</th><td>{emp.email}</td></tr>
          <tr><th>계정 유형</th><td>{emp.userType}</td></tr>
        </tbody>
      </table>
    </div>
  );
}
