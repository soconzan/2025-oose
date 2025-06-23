import React, { useState, useEffect } from 'react';

const PAGE_SIZE = 10; // 한 페이지에 보여줄 항목 개수

function WorkroomList() {
  const [workrooms, setWorkrooms] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch('http://localhost:8000/api/workrooms')
      .then(res => res.json())
      .then(data => setWorkrooms(Array.isArray(data) ? data : []));
  }, []);

  // 필터링된 데이터
  const filtered = workrooms.filter(item =>
    item.workTitle?.toLowerCase().includes(search.toLowerCase())
  );

  // 페이징된 데이터
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <h2>업무 목록</h2>
      <input
        style={{ marginBottom: 10, width: 400 }}
        placeholder="업무명을 입력하세요"
        value={search}
        onChange={e => { setSearch(e.target.value); setPage(1); }}
      />
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        background: "#fff"
      }}>
        <thead style={{ background: "#f8f9fa" }}>
          <tr>
            <th style={{ border: "1px solid #ccc" }}>업무명</th>
            <th style={{ border: "1px solid #ccc" }}>카테고리</th>
            <th style={{ border: "1px solid #ccc" }}>담당자</th>
            <th style={{ border: "1px solid #ccc" }}>업무기간</th>
            <th style={{ border: "1px solid #ccc" }}>업무내용</th>
          </tr>
        </thead>
        <tbody>
          {paged.map(room => (
            <tr key={room.id}>
              <td style={{ border: "1px solid #ccc" }}>{room.workTitle}</td>
              <td style={{ border: "1px solid #ccc" }}>{room.category}</td>
              <td style={{ border: "1px solid #ccc" }}>{room.assignee}</td>
              <td style={{ border: "1px solid #ccc" }}>
                {room.startDate} ~ {room.endDate}
              </td>
              <td style={{ border: "1px solid #ccc" }}>{room.workContent}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {filtered.length === 0 && (
        <div style={{ margin: 20, color: "#888" }}>검색 결과가 없습니다.</div>
      )}
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span style={{ margin: "0 12px" }}>
          {page} / {totalPages === 0 ? 1 : totalPages}
        </span>
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default WorkroomList;
