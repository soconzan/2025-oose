import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../components/schedule/Schedule.css';

const SHARE_SCOPE_MAP = {
  0: '전체',
  1: '부서',
  2: '개인'
};
const ALARM_TARGET_MAP = {
    0: '없음',
    1: '전체',
    2: '부서',
    3: '개인'
};

export default function ScheduleDetailPage() {
  const { id } = useParams();
  console.log("ScheduleDetailPage id:", id);
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    fetch(`/schedules/${id}`)
      .then(res => res.json())
      .then(data => setSchedule(data))
      .catch(() => alert('일정 정보를 불러오는데 실패했습니다.'));
  }, [id]);

  if (!schedule) return <p>로딩 중...</p>;

  return (
    <div className="schedule-detail-container">
      <button onClick={() => navigate(-1)}>← 목록으로</button>
      <h2>일정 상세 정보</h2>
      <table>
        <tbody>
          <tr><th>일정 ID</th><td>{schedule.scheduleId}</td></tr>
          <tr><th>제목</th><td>{schedule.title}</td></tr>
          <tr><th>시작 시간</th><td>{new Date(schedule.startTime).toLocaleString()}</td></tr>
          <tr><th>종료 시간</th><td>{new Date(schedule.endTime).toLocaleString()}</td></tr>
          <tr><th>공유 범위</th><td>{SHARE_SCOPE_MAP[schedule.shareScope] || schedule.shareScope}</td></tr>
          <tr><th>알림 대상</th><td>{ALARM_TARGET_MAP[schedule.alarmTarget] || schedule.alarmTarget}</td></tr>
          <tr><th>내용</th><td>{schedule.content}</td></tr>
        </tbody>
      </table>
    </div>
  );
}