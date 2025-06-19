import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WorkroomList() {
  const [workrooms, setWorkrooms] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/workrooms')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setWorkrooms(data);
        else setWorkrooms([]);
      })
      .catch(err => {
        setWorkrooms([]);
        console.error(err);
      });
  }, []);

  const filtered = workrooms.filter(w =>
    w.work_title && w.work_title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <h2>업무 목록</h2>
      <input
        type="text"
        placeholder="업무명을 입력하세요"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 10, width: '100%' }}
      />
      <table border="1" width="100%" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>업무명</th>
            <th>카테고리</th>
            <th>담당자</th>
            <th>업무기간</th>
            <th>업무내용</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center' }}>업무가 없습니다.</td>
            </tr>
          ) : (
            filtered.map(w => (
              <tr key={w.id}>
                <td>{w.work_title}</td>
                <td>{w.category}</td>
                <td>{w.assignee}</td>
                <td>{w.start_date} ~ {w.end_date}</td>
                <td>{w.is_public ? w.work_content : '비공개'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div style={{ marginTop: 16 }}>
        <button type="button" onClick={() => navigate('/workspace')}>
          뒤로가기
        </button>
      </div>
    </div>
  );
}

export default WorkroomList;
