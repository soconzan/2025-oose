import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';

const DocumentDetailPage = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: '20px' }}>
      <h2>문서 상세보기</h2>
      <p>문서 ID: {id}</p>
      
      <div style={{ border: '1px solid #ccc', padding: '20px', marginTop: '20px' }}>
        <h3>문서 내용이 여기에 표시됩니다</h3>
      </div>

      <Button
        variant="contained"
        style={{ marginTop: '20px' }}
      >
        수정하기
      </Button>
    </div>
  );
};

export default DocumentDetailPage;
