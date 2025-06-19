import React, { useState } from 'react';

function WorkroomEditForm({ workroom, onDone }) {
  const [form, setForm] = useState({
    work_title: workroom.work_title || '',
    category: workroom.category || '',
    assignee: workroom.assignee || '',
    work_content: workroom.work_content || '',
    is_public: workroom.is_public,
    start_date: workroom.start_date || '',
    end_date: workroom.end_date || '',
  });
  const [saving, setSaving] = useState(false);

    const handleChange = e => {
    const { name, value, type } = e.target;
    setForm(prev => ({
        ...prev,
        [name]:
        name === 'is_public'
            ? value === 'public'
            : value,
    }));
    };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`http://localhost:8000/workrooms/${workroom.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert('수정이 완료되었습니다!');
        onDone(true);
      } else {
        alert('수정 실패');
      }
    } catch (error) {
      alert('수정 중 오류 발생');
    }
    setSaving(false);
  };

  return (
    <div style={{ border: '1px solid #aaa', padding: 24, background: '#fafafa' }}>
      <h3>업무 수정</h3>
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
          <button type="submit" disabled={saving} style={{ marginRight: 10 }}>수정완료</button>
          <button type="button" onClick={() => onDone(false)} style={{ marginLeft: 10 }}>
            뒤로가기
          </button>
        </div>
      </form>
    </div>
  );
}

export default WorkroomEditForm;
