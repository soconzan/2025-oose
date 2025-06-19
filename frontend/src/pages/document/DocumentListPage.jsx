import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllDocuments } from '../../api/documentApi';
import './Document.css'; // 간단한 스타일을 위해 CSS 파일도 추가합니다.

const DocumentListPage = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await getAllDocuments();
        setDocuments(data);
      } catch (error) {
        // 에러 처리
      }
    };
    fetchDocuments();
  }, []);

  return (
    <div className="doc-container">
      <h1>문서 관리</h1>
      <button onClick={() => navigate('/documents/new')} className="doc-new-btn">
        새 문서 등록
      </button>
      <table className="doc-table">
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
                <Link to={`/documents/${doc.id}`} className="doc-title-link">
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
    </div>
  );
};

export default DocumentListPage;