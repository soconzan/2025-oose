import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WorkroomRegister() {
  const [form, setForm] = useState({
    work_title: '',
    category: '',
    assignee: '',
    work_content: '',
    is_public: true,
    start_date: '',
    end_date: '',
  });
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'radio' ? value === 'public' : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/workrooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert('등록 성공!');
        setForm({
          work_title: '',
          category: '',
          assignee: '',
          work_content: '',
          is_public: true,
          start_date: '',
          end_date: '',
        });
        navigate('/workspace/list');
      } else {
        alert('등록 실패');
      }
    } catch (error) {
      alert('등록 중 오류 발생');
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>부서업무 등록</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>업무명</label><br />
          <input name="work_title" value={form.work_title} onChange={handleChange} required />
        </div>
        <div>
          <label>카테고리</label><br />
          <input name="category" value={form.category} onChange={handleChange} />
        </div>
        <div>
          <label>담당자</label><br />
          <input name="assignee" value={form.assignee} onChange={handleChange} required />
        </div>
        <div>
          <label>업무 내용</label><br />
          <textarea name="work_content" value={form.work_content} onChange={handleChange} />
        </div>
        <div>
          <label>업무공개여부</label>
          <input type="radio" name="is_public" value="public" checked={form.is_public === true} onChange={handleChange} /> 공개
          <input type="radio" name="is_public" value="private" checked={form.is_public === false} onChange={handleChange} /> 비공개
        </div>
        <div>
          <label>시작일</label><br />
          <input name="start_date" type="date" value={form.start_date} onChange={handleChange} required />
        </div>
        <div>
          <label>종료일</label><br />
          <input name="end_date" type="date" value={form.end_date} onChange={handleChange} required />
        </div>
        <div style={{ marginTop: 10 }}>
          <button type="submit" style={{ marginRight: 10 }}>등록</button>
          <button type="button" onClick={() =>
            setForm({
              work_title: '',
              category: '',
              assignee: '',
              work_content: '',
              is_public: true,
              start_date: '',
              end_date: '',
            })
          }>취소</button>
          <button type="button" onClick={() => navigate('/workspace')} style={{ marginLeft: 10 }}>
            뒤로가기
          </button>
        </div>
      </form>
    </div>
  );
}

export default WorkroomRegister;
