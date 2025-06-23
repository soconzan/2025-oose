// src/components/Schedule/ScheduleRegister.jsx
import React, { useState } from 'react';
import '../schedule/Schedule.css';

export default function ScheduleRegister({ onCancel, onSubmit }) {
  const shareScopeOptions = [
    { value: 0, label: '전체' },
    { value: 1, label: '부서' },
    { value: 2, label: '개인' }
  ];
  const alarmTargetOptions = [
    { value: 0, label: '없음' },
    { value: 1, label: '전체' },
    { value: 2, label: '부서' },
    { value: 3, label: '개인' }
  ];

  const [form, setForm] = useState({
    description: '',
    startDate: '',
    endDate: '',
    sharingScope: '',
    smsAlertTime: '',
    smsAlertTarget: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      description: form.description,
      startDate: form.startDate,
      endDate: form.endDate,
      sharingScope: parseInt(form.sharingScope, 10),
      smsAlertTime: form.smsAlertTime ? `${form.startDate.split('T')[0]}T${form.smsAlertTime}:00` : null,
      smsAlertTarget: parseInt(form.smsAlertTarget, 10)
    });
  };

return (
    <form className="register-form" onSubmit={handleSubmit}>
        <h2>일정 등록</h2>
        
        <div className="field">
            <label>일정 내용</label>
            <input 
                name="description" 
                value={form.description} 
                onChange={handleChange} 
                placeholder="일정 내용" 
                required 
            />
        </div>

        <div className="field phone-field">
            <label></label>
            <input 
                name="startDate" 
                type="datetime-local"
                value={form.startDate} 
                onChange={handleChange} 
                required 
            />
            <span>~</span>
            <input 
                name="endDate" 
                type="datetime-local"
                value={form.endDate} 
                onChange={handleChange} 
                required 
            />
        </div>

        <div className="field">
            <label>공유 범위</label>
            <select
                name="sharingScope" 
                value={form.sharingScope} 
                onChange={handleChange} 
                placeholder="공유 범위" 
                required 
            >
                <option value="">선택</option>
                {shareScopeOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>

        <div className="field">
            <label>알림 대상</label>
            <select
                name="smsAlertTarget" 
                value={form.smsAlertTarget} 
                onChange={handleChange} 
                placeholder="알림 대상" 
                required>
                <option value="">선택</option>
                {alarmTargetOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>

        <div className="field">
            <label>알림 시간</label>
            <input 
                name="smsAlertTime" 
                type="time"
                value={form.smsAlertTime} 
                onChange={handleChange} 
                placeholder="알림 시간" 
                disabled={form.smsAlertTarget === "0" || form.smsAlertTarget === 0}
                required={form.smsAlertTarget !== "0" && form.smsAlertTarget !== 0}
            />
        </div>

        <div className="buttons">
            <button type="button" className="cancel" onClick={onCancel}>취소</button>
            <button type="submit" className="submit">등록</button>
        </div>
    </form>
);
}