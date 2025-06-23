import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createDocument } from '../../api/documentApi';
import DocumentForm from '../../components/document/DocumentForm'; // 컴포넌트 import

const DocumentCreatePage = () => {
  const navigate = useNavigate();

  const handleCreateSubmit = async (documentData) => {
    try {
      const createdDoc = await createDocument(documentData);
      alert('문서가 성공적으로 등록되었습니다.');
      navigate(`/documents/${createdDoc.id}`); // 등록된 문서 상세 페이지로 이동
    } catch (error) {
      alert('문서 등록에 실패했습니다.');
      console.error("문서 생성 중 에러 발생:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="mb-3">새 문서 등록</h1>
      <DocumentForm onSubmit={handleCreateSubmit} />
    </div>
  );
};

export default DocumentCreatePage;