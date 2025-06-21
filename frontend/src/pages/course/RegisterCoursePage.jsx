import React from 'react';
import CourseForm from '../../components/Course/CourseForm';

const RegisterCoursePage = () => {
  const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    padding: '40px 0'
  };

  const formContainerStyle = {
    width: '100%',
    maxWidth: '800px',
    padding: '30px',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    backgroundColor: '#fff'
  };

  return (
    <div style={pageStyle}>
      <div style={formContainerStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontWeight: '600' }}>
          새 교육 과정 등록
        </h2>
        <CourseForm />
      </div>
    </div>
  );
};

export default RegisterCoursePage; 