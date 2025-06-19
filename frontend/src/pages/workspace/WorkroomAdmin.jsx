import React, { useEffect, useState } from 'react';
import WorkroomEditForm from './WorkroomEditForm';

function WorkroomAdmin() {
  const [workrooms, setWorkrooms] = useState([]);
  const [editId, setEditId] = useState(null); // 수정할 업무 id
  const [editData, setEditData] = useState(null);

  // 업무 목록 불러오기
  const fetchWorkrooms = () => {
    fetch('http://localhost:8000/workrooms')
      .then(res => res.json())
      .then(data => setWorkrooms(Array.isArray(data) ? data : []));
  };

  useEffect(fetchWorkrooms, []);

  // 삭제 버튼 클릭
  const handleDelete = id => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    fetch(`http://localhost:8000/workrooms/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) {
          setWorkrooms(ws => ws.filter(w => w.id !== id));
        } else {
          alert('삭제 실패');
        }
      });
  };

  // 수정 버튼 클릭
  const handleEdit = workroom => {
    setEditId(workroom.id);
    setEditData(workroom);
  };

  // 수정 완료/취소 시 호출
  const handleEditDone = (updated) => {
    setEditId(null);
    setEditData(null);
    if (updated) fetchWorkrooms();
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <h2>업무 관리(수정/삭제)</h2>
      <table border="1" width="100%" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>업무명</th>
            <th>카테고리</th>
            <th>담당자</th>
            <th>업무기간</th>
            <th>업무내용</th>
            <th>업무공개여부</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {workrooms.map(w => (
            <tr key={w.id}>
              <td>{w.id}</td>
              <td>{w.work_title}</td>
              <td>{w.category}</td>
              <td>{w.assignee}</td>
              <td>{w.start_date} ~ {w.end_date}</td>
              <td>{w.work_content}</td>
              <td>{w.is_public ? '공개' : '비공개'}</td>
              <td>
                <button onClick={() => handleEdit(w)}>수정</button>
              </td>
              <td>
                <button onClick={() => handleDelete(w.id)} style={{ color: 'red', fontWeight: 'bold' }}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 수정 폼은 editId가 있을 때만 표시 */}
      {editId && (
        <div style={{ marginTop: 24 }}>
          <WorkroomEditForm workroom={editData} onDone={handleEditDone} />
        </div>
      )}
      <div style={{ marginTop: 24 }}>
        <button type="button" onClick={() => window.location.href = '/workspace'}>
          뒤로가기
        </button>
      </div>
    </div>
  );
}

export default WorkroomAdmin;
