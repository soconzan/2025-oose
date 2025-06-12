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
    scheduleName: '',
    startDate: '',
    endDate: '',
    shareScope: '',
    alarmStartTime: '',
    alarmTarget: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      scheduleName: form.scheduleName,
      startDate: form.startDate,
      endDate: form.endDate,
      shareScope: form.shareScope,
      alarmStartTime: form.alarmStartTime,
      alarmTarget: form.alarmTarget
    });
  };

return (
    <form className="register-form" onSubmit={handleSubmit}>
        <h2>일정 등록</h2>
        
        <div className="field">
            <label>일정 내용</label>
            <input 
                name="scheduleName" 
                value={form.scheduleName} 
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
                name="shareScope" 
                value={form.shareScope} 
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
                name="alarmTarget" 
                value={form.alarmTarget} 
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
                name="alarmStartTime" 
                type="time"
                value={form.alarmStartTime} 
                onChange={handleChange} 
                placeholder="알림 시간" 
                disabled={form.alarmTarget === "0" || form.alarmTarget === 0}
                required={form.alarmTarget !== "0" && form.alarmTarget !== 0}
            />
        </div>

        <div className="buttons">
            <button type="button" className="cancel" onClick={onCancel}>취소</button>
            <button type="submit" className="submit">등록</button>
        </div>
    </form>
);
}