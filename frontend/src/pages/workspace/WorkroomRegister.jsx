import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function WorkroomRegister() {
  const [employeeList, setEmployeeList] = useState([]);
  const [assigneeName, setAssigneeName] = useState('');
  const [assigneeNum, setAssigneeNum] = useState('');
  const [candidateNums, setCandidateNums] = useState([]);
  const [nameError, setNameError] = useState('');
  const [form, setForm] = useState({
    workTitle: '',
    category: '',
    workContent: '',
    isPublic: true,
    startDate: '',
    endDate: '',
  });
  const [dateError, setDateError] = useState('');
  const navigate = useNavigate();

  // 직원 전체 목록 불러오기
  useEffect(() => {
    fetch('http://localhost:8000/api/employees')
      .then(res => res.json())
      .then(data => {
        const list = Array.isArray(data) ? data : (data.items || []);
        setEmployeeList(list);
      })
      .catch(() => setEmployeeList([]));
  }, []);

  // 이름 입력시 동명이인 후보만 뽑기
  const handleAssigneeNameChange = (e) => {
    const name = e.target.value;
    setAssigneeName(name);
    setNameError('');
    setAssigneeNum('');
    if (name.trim().length >= 2) {
      const matches = employeeList.filter(
        emp => emp.name.trim() === name.trim()
      );
      setCandidateNums(matches.map(emp => emp.employeeNum));
    } else {
      setCandidateNums([]);
    }
  };

  // 날짜 입력 시 유효성 체크
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => {
      const updated = { ...prev, [name]: value };
      // 날짜 비교
      if (
        updated.startDate &&
        updated.endDate &&
        updated.startDate > updated.endDate
      ) {
        setDateError('시작일은 종료일보다 빠르거나 같아야 합니다.');
      } else {
        setDateError('');
      }
      return updated;
    });
  };

  // 등록 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!assigneeName || !assigneeNum) {
      setNameError('직원명과 직원번호를 모두 선택하세요.');
      return;
    }
    // 직원 유효성
    const emp = employeeList.find(
      emp =>
        emp.employeeNum === Number(assigneeNum) &&
        emp.name.trim() === assigneeName.trim()
    );
    if (!emp) {
      setNameError('직원명과 직원번호가 일치하지 않습니다.');
      return;
    }
    // 날짜 유효성
    if (form.startDate > form.endDate) {
      setDateError('시작일은 종료일보다 빠르거나 같아야 합니다.');
      return;
    }
    setDateError('');

    // 등록 요청
    try {
      const res = await fetch('http://localhost:8000/api/workrooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          assignee: assigneeName,
          assigneeNum: parseInt(assigneeNum, 10)
        }),
      });
      if (res.ok) {
        alert('등록 성공!');
        setAssigneeName('');
        setAssigneeNum('');
        setCandidateNums([]);
        setForm({
          workTitle: '',
          category: '',
          workContent: '',
          isPublic: true,
          startDate: '',
          endDate: '',
        });
        setNameError('');
        setDateError('');
        navigate('/workspaces');
      } else {
        alert('등록 실패');
      }
    } catch (error) {
      alert('등록 중 오류 발생');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>부서업무 등록</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>담당자 이름</label><br />
          <input
            value={assigneeName}
            onChange={handleAssigneeNameChange}
            placeholder="직원명 입력"
            required
            autoComplete="off"
          />
        </div>
        <div>
          <label>직원번호</label><br />
          <select
            value={assigneeNum}
            onChange={e => setAssigneeNum(e.target.value)}
            required
          >
            <option value="">직원번호를 선택하세요</option>
            {candidateNums.map(num =>
              <option value={num} key={num}>{num}</option>
            )}
          </select>
          {nameError && <div style={{ color: 'red' }}>{nameError}</div>}
        </div>
        <div>
          <label>업무명</label><br />
          <input
            name="workTitle"
            value={form.workTitle}
            onChange={e => setForm(prev => ({ ...prev, workTitle: e.target.value }))}
            required
          />
        </div>
        <div>
          <label>카테고리</label><br />
          <input
            name="category"
            value={form.category}
            onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
          />
        </div>
        <div>
          <label>업무 내용</label><br />
          <textarea
            name="workContent"
            value={form.workContent}
            onChange={e => setForm(prev => ({ ...prev, workContent: e.target.value }))}
          />
        </div>
        <div>
          <label>업무공개여부</label>
          <input
            type="radio"
            name="isPublic"
            value="true"
            checked={form.isPublic === true}
            onChange={() => setForm(prev => ({ ...prev, isPublic: true }))}
          /> 공개
          <input
            type="radio"
            name="isPublic"
            value="false"
            checked={form.isPublic === false}
            onChange={() => setForm(prev => ({ ...prev, isPublic: false }))}
          /> 비공개
        </div>
        <div>
          <label>시작일</label><br />
          <input
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleDateChange}
            required
          />
        </div>
        <div>
          <label>종료일</label><br />
          <input
            name="endDate"
            type="date"
            value={form.endDate}
            onChange={handleDateChange}
            required
          />
        </div>
        {dateError && <div style={{ color: 'red' }}>{dateError}</div>}
        <div style={{ marginTop: 10 }}>
          <button type="submit">등록</button>
        </div>
      </form>
    </div>
  );
}

export default WorkroomRegister;
