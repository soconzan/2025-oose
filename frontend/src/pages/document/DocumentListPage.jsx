import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllDocuments } from '../../api/documentApi';
import DocumentList from '../../components/document/DocumentList'; // 컴포넌트 import

const DocumentListPage = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await getAllDocuments();
        setDocuments(data);
      } catch (error) {
        console.error("문서 목록을 불러오는 중 에러 발생:", error);
      }
    };
    fetchDocuments();
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>문서 관리</h1>
        <button onClick={() => navigate('/documents/new')} className="btn btn-primary">
          새 문서 등록
        </button>
      </div>
      <DocumentList documents={documents} />
    </div>
  );
};

export default DocumentListPage;