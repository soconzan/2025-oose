import React, { useState } from 'react';

function WorkroomEditForm({ workroom, onDone }) {
  const [form, setForm] = useState({
    workTitle: workroom.workTitle || '',
    category: workroom.category || '',
    assignee: workroom.assignee || '',
    workContent: workroom.workContent || '',
    isPublic: workroom.isPublic,
    startDate: workroom.startDate || '',
    endDate: workroom.endDate || '',
  });
  const [saving, setSaving] = useState(false);

    const handleChange = e => {
    const { name, value, type } = e.target;
    setForm(prev => ({
        ...prev,
        [name]:
        name === 'isPublic'
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
          <input name="workTitle" value={form.workTitle} onChange={handleChange} required />
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
          <textarea name="workContent" value={form.workContent} onChange={handleChange} />
        </div>
        <div>
          <label>업무공개여부</label>
          <input type="radio" name="isPublic" value="public" checked={form.isPublic === true} onChange={handleChange} /> 공개
          <input type="radio" name="isPublic" value="private" checked={form.isPublic === false} onChange={handleChange} /> 비공개
        </div>
        <div>
          <label>시작일</label><br />
          <input name="startDate" type="date" value={form.startDate} onChange={handleChange} required />
        </div>
        <div>
          <label>종료일</label><br />
          <input name="endDate" type="date" value={form.endDate} onChange={handleChange} required />
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
