import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/employee/RegisterForm';
import { createEmployee } from '../../api/employeeApi';

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await createEmployee(formData);
      navigate('/employees');
    } catch (err) {
      console.error('등록 에러 상세:', err);

      if (Array.isArray(err.detail)) {
        err.detail.forEach(e => {
          console.error(`필드: ${e.loc.join('.')}, 문제: ${e.msg}`);
        });
        
        const messages = err.detail
          .map(e => `${e.loc.slice(-1)[0]}: ${e.msg}`)
          .join('\n');
        alert(messages);

      } else if (typeof err.detail === 'string') {
        alert(err.detail);

      } else {
        alert('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <RegisterForm
      onSubmit={handleSubmit}
      onCancel={() => navigate('/employees')}
    />
  );
}
