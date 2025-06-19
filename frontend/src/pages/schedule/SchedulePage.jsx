import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../components/schedule/Schedule.css';
import ScheduleRegister from '../../components/schedule/ScheduleRegister';

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
const SHARE_SCOPE_OPTIONS = Object.entries(SHARE_SCOPE_MAP).map(([value, label]) => ({ value, label }));
const ALARM_TARGET_OPTIONS = Object.entries(ALARM_TARGET_MAP).map(([value, label]) => ({ value, label }));

export default function SchedulePage() {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({ shareScope: '', alarmTarget: '', keyword: '' });
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    fetch(`/schedules?skip=${(page - 1) * limit}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        const items = data.items || data;
        setSchedules(items);
        setFiltered(items);
        setTotal(data.totalCount || items.length);
      });
  }, [page]);

  useEffect(() => {
    let temp = schedules;
    if (filters.shareScope) temp = temp.filter(s => String(s.shareScope) === filters.shareScope);
    if (filters.alarmTarget) temp = temp.filter(s => String(s.alarmTarget) === filters.alarmTarget);
    if (filters.keyword) {
      temp = temp.filter(s =>
        s.title.includes(filters.keyword) ||
        s.scheduleId.toString().includes(filters.keyword)
      );
    }
    setFiltered(temp);
  }, [filters, schedules]);

  const totalPages = Math.ceil(total / limit);

  // 달력 관련 함수들
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getSchedulesForDate = (date) => {
    return filtered.filter(schedule => {
      const scheduleDate = new Date(schedule.startTime);
      return scheduleDate.getDate() === date &&
             scheduleDate.getMonth() === currentDate.getMonth() &&
             scheduleDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const getSchedulesForDay = (date) => {
    const daySchedules = filtered.filter(schedule => {
      const scheduleDate = new Date(schedule.startTime);
      return scheduleDate.getDate() === date &&
             scheduleDate.getMonth() === currentDate.getMonth() &&
             scheduleDate.getFullYear() === currentDate.getFullYear();
    });
    return daySchedules;
  };

  const changeMonth = (increment) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + increment);
      return newDate;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

    // 빈 셀 추가 (이전 달 마지막 날들)
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // 현재 달의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      const daySchedules = getSchedulesForDate(day);
      days.push(
        <div key={day} className="calendar-day">
          <div className="day-number">{day}</div>
          {daySchedules.length > 0 && (
            <div className="schedule-indicator">
              {daySchedules.slice(0, 2).map(schedule => (
                <div key={schedule.scheduleId} className="schedule-item">
                  {schedule.title}
                </div>
              ))}
              {daySchedules.length > 2 && (
                <div className="more-schedules">+{daySchedules.length - 2}개</div>
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={() => changeMonth(-1)}>◀</button>
          <h3>{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</h3>
          <button onClick={() => changeMonth(1)}>▶</button>
        </div>
        <div className="calendar-weekdays">
          {weekDays.map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        <div className="calendar-grid">
          {days}
        </div>
      </div>
    );
  };

  const renderScheduleList = () => {
    // 현재 월의 일정들을 날짜별로 그룹화
    const currentMonthSchedules = filtered.filter(schedule => {
      const scheduleDate = new Date(schedule.startTime);
      return scheduleDate.getMonth() === currentDate.getMonth() &&
             scheduleDate.getFullYear() === currentDate.getFullYear();
    });

    const groupedSchedules = currentMonthSchedules.reduce((groups, schedule) => {
      const date = new Date(schedule.startTime).getDate();
      const key = `${currentDate.getMonth() + 1}월 ${date}일`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(schedule);
      return groups;
    }, {});

    return (
      <div className="schedule-list-view">
        {Object.entries(groupedSchedules).map(([dateKey, scheduleList]) => (
          <div key={dateKey} className="date-group">
            <h4 className="date-header">{dateKey}</h4>
            {scheduleList.map(schedule => (
              <div key={schedule.scheduleId} className="schedule-list-item">
                <div className="schedule-title">{schedule.title}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="schedule-list-container">
      <h2>일정 조회</h2>
      
      {/* 뷰 모드 선택 */}
      <div className="view-mode-selector">
        <label>
          <input
            type="radio"
            name="viewMode"
            value="list"
            checked={viewMode === 'list'}
            onChange={(e) => setViewMode(e.target.value)}
          />
          목록 보기
        </label>
        <label>
          <input
            type="radio"
            name="viewMode"
            value="calendar"
            checked={viewMode === 'calendar'}
            onChange={(e) => setViewMode(e.target.value)}
          />
          달력 보기
        </label>
      </div>

      <div className="filters">
        <select
          value={filters.shareScope}
          onChange={e => setFilters({ ...filters, shareScope: e.target.value })}>
          <option value="">공유 범위</option>
          {SHARE_SCOPE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {/* <select
          value={filters.alarmTarget}
          onChange={e => setFilters({ ...filters, alarmTarget: e.target.value })}>
          <option value="">알림 대상</option>
          {ALARM_TARGET_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="제목/일정 ID"
          value={filters.keyword}
          onChange={e => setFilters({ ...filters, keyword: e.target.value })}
        />
        <button onClick={() => setShowRegister(true)}>일정 등록</button> */}
      </div>

      {/* 뷰 모드에 따른 렌더링 */}
      {viewMode === 'calendar' ? (
        <div className="calendar-and-list">
          {renderCalendar()}
          {renderScheduleList()}
        </div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>일정 ID</th>
                <th>제목</th>
                <th>시작 시간</th>
                <th>종료 시간</th>
                <th>공유 범위</th>
                <th>알림 대상</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(schedule => (
                <tr key={schedule.scheduleId} onClick={() => navigate(`/schedules/${schedule.scheduleId}`)}>
                  <td>{schedule.scheduleId}</td>
                  <td>{schedule.title}</td>
                  <td>{new Date(schedule.startTime).toLocaleString()}</td>
                  <td>{new Date(schedule.endTime).toLocaleString()}</td>
                  <td>{SHARE_SCOPE_MAP[schedule.shareScope] || schedule.shareScope}</td>
                  <td>{ALARM_TARGET_MAP[schedule.alarmTarget] || schedule.alarmTarget}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>◀ 이전</button>
            <span>{page} / {totalPages}</span>
            <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>다음 ▶</button>
          </div>
        </>
      )}

      {showRegister && (
        <ScheduleRegister
          onClose={() => setShowRegister(false)}
          onSuccess={() => {
            setShowRegister(false);
            setPage(1);
          }}
        />
      )}
    </div>
  );
}