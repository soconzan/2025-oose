import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getDocumentById, deleteDocument } from '../../api/documentApi';
import '../../components/document/Document.css'; // 공용 CSS import

const DocumentDetailPage = () => {
  const { id } = useParams(); // URL에서 문서 ID를 가져옴
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const data = await getDocumentById(id);
        setDocument(data);
      } catch (error) {
        alert('문서를 불러오는 데 실패했습니다.');
        console.error(error);
      }
    };
    fetchDocument();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('정말로 이 문서를 삭제하시겠습니까?')) {
      try {
        await deleteDocument(id);
        alert('문서가 삭제되었습니다.');
        navigate('/documents');
      } catch (error) {
        alert('문서 삭제에 실패했습니다.');
        console.error(error);
      }
    }
  };

  if (!document) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="container">
       <div className="detail-container">
        <div className="detail-header">
          <h1 className="detail-title">{document.title}</h1>
          <div className="detail-meta">
            <span><strong>작성자:</strong> {document.author ? document.author.name : 'N/A'}</span>
            <span><strong>카테고리:</strong> {document.category}</span>
            <span><strong>작성일:</strong> {new Date(document.created_date).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="detail-content">
          <p>{document.content}</p>
        </div>
        <div className="form-actions">
          <Link to="/documents" className="btn">목록</Link>
          <button onClick={handleDelete} className="btn btn-danger">삭제</button>
        </div>
       </div>
    </div>
  );
};

export default DocumentDetailPage;