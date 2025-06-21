// src/components/Employee/RegisterForm.jsx
import React, { useState } from 'react';
import './Employee.css';

export default function RegisterForm({ onCancel, onSubmit }) {
  const deptOptions = [
    { id: 101, name: '기획조정실' },
    { id: 102, name: '재정관리국' },
    { id: 103, name: '국고국' },
    { id: 104, name: '세제실' },
    { id: 105, name: '대변인실' }
  ];

  const posOptions = ['사원', '대리', '과장', '차장', '부장'];

  const [form, setForm] = useState({
    name: '',
    employeeNum: '',
    employeeId: '',
    email: '',
    department: '',
    position: '',
    phone1: '',
    phone2: '',
    phone3: '',
    userType: 'USER'
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      name: form.name,
      employeeNum: form.employeeNum,
      employeeId: form.employeeId,
      email: form.emailLocal + '@moef.go.kr',
      departmentId: parseInt(form.department, 10),
      position: form.position,
      phone: `${form.phone1}-${form.phone2}-${form.phone3}`,
      userType: form.userType
    });
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>직원 등록</h2>
      <div className="field">
        <label>사원명</label>
        <input name="name" value={form.name} onChange={handleChange} placeholder="홍길동" required />
      </div>
      <div className="field">
        <label>사번</label>
        <input name="employeeNum" value={form.employeeNum} onChange={handleChange} placeholder="2024000000" required />
      </div>
      <div className="field">
        <label>아이디</label>
        <input name="employeeId" value={form.employeeId} onChange={handleChange} placeholder="hong123" required />
      </div>
      <div className="field">
        <label>메일</label>
        <input
          name="emailLocal"
          value={form.emailLocal}
          onChange={handleChange}
          placeholder="hong0123"
          required
        />
        <span className="at"> @moef.go.kr</span>
      </div>
      <div className="field">
        <label>부서</label>
        <select name="department" value={form.department} onChange={handleChange} required>
          <option value="">선택</option>
          {deptOptions.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label>직급</label>
        <select name="position" value={form.position} onChange={handleChange} required>
          <option value="">선택</option>
          {posOptions.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
      <div className="field phone-field">
        <label>연락처</label>
        <input name="phone1" value={form.phone1} onChange={handleChange} maxLength={3} placeholder="010" required />
        <span>-</span>
        <input name="phone2" value={form.phone2} onChange={handleChange} maxLength={4} placeholder="1234" required />
        <span>-</span>
        <input name="phone3" value={form.phone3} onChange={handleChange} maxLength={4} placeholder="5678" required />
      </div>
      <div className="field radio-field">
        <label>계정 유형</label>
        <label>
          <input
            type="radio"
            name="userType"
            value="USER"
            checked={form.userType === 'USER'}
            onChange={handleChange}
          /> 사용자
        </label>
        <label>
          <input
            type="radio"
            name="userType"
            value="ADMIN"
            checked={form.userType === 'ADMIN'}
            onChange={handleChange}
          /> 관리자
        </label>
      </div>
      <div className="buttons">
        <button type="button" className="cancel" onClick={onCancel}>취소</button>
        <button type="submit" className="submit">등록</button>
      </div>
    </form>
  );
}
