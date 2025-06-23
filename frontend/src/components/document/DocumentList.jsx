import React from 'react';
import { Link } from 'react-router-dom';
import './Document.css'; // 공용 CSS 파일을 사용합니다.

const DocumentList = ({ documents }) => {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>카테고리</th>
          <th>작성자</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((doc) => (
          <tr key={doc.id}>
            <td>{doc.id}</td>
            <td>
              <Link to={`/documents/${doc.id}`} className="title-link">
                {doc.title}
              </Link>
            </td>
            <td>{doc.category}</td>
            <td>{doc.author ? doc.author.name : 'N/A'}</td>
            <td>{new Date(doc.created_date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DocumentList;