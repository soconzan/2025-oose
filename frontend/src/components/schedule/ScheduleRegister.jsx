// src/components/Schedule/ScheduleRegister.jsx
import React, { useState } from 'react';
import '../schedule/Schedule.css';

export default function ScheduleRegister({ onCancel, onSubmit }) {
  const [form, setForm] = useState({
    scheduleName: '',
    startDate: '',
    endDate: '',
    shareScope: '',
    workStartTime: '',
    workEndTime: '',
    workTarget: ''
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
      workStartTime: form.workStartTime,
      workEndTime: form.workEndTime,
      workTarget: form.workTarget
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
          type="date"
          value={form.startDate} 
          onChange={handleChange} 
          required 
        />
        <span>~</span>
        <input 
          name="endDate" 
          type="date"
          value={form.endDate} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className="field">
        <label>공유 범위</label>
        <input 
          name="shareScope" 
          value={form.shareScope} 
          onChange={handleChange} 
          placeholder="공유 범위" 
          required 
        />
      </div>

      <div className="field">
        <label>업무 시간</label>
        <input 
          name="workStartTime" 
          type="time"
          value={form.workStartTime} 
          onChange={handleChange} 
          placeholder="업무 시간" 
          required 
        />
      </div>

      <div className="field">
        <label>업무 대상</label>
        <input 
          name="workTarget" 
          value={form.workTarget} 
          onChange={handleChange} 
          placeholder="업무 대상" 
          required 
        />
      </div>

      <div className="buttons">
        <button type="button" className="cancel" onClick={onCancel}>취소</button>
        <button type="submit" className="submit">등록</button>
      </div>
    </form>
  );
}