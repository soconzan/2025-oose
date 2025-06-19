import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Document.css'; // 공용 CSS 파일을 사용합니다.

const DocumentForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !category || !content) {
      alert('제목, 카테고리, 내용을 모두 입력해주세요.');
      return;
    }
    // author_id는 실제 로그인된 사용자 ID로 설정해야 합니다.
    // 지금은 임시로 1번 사용자로 하드코딩합니다.
    const documentData = { title, category, content, author_id: 1 };
    onSubmit(documentData);
  };

  return (
    <form onSubmit={handleSubmit} className="data-form">
      <div className="form-group">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">카테고리</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          rows="15"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">등록</button>
        <button type="button" className="btn" onClick={() => navigate('/documents')}>취소</button>
      </div>
    </form>
  );
};

export default DocumentForm;