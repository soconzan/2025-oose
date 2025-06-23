import React, { useState, useEffect, useMemo } from 'react'; // useMemo 추가
import { useNavigate } from 'react-router-dom';
import '../../components/schedule/Schedule.css';
import ScheduleRegister from '../../components/schedule/ScheduleRegister';
import { createSchedule } from '../../api/scheduleApi'; // createSchedule import

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
  const [viewMode, setViewMode] = useState('list');
  const [currentDate, setCurrentDate] = useState(new Date());

  const fetchSchedules = () => {
    fetch(`/api/schedules?skip=${(page - 1) * limit}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        const items = data.items || data;
        setSchedules(Array.isArray(items) ? items : []);
        setTotal(data.totalCount || (Array.isArray(items) ? items.length : 0));
      });
  };

  useEffect(() => {
    fetchSchedules();
  }, [page]);

  useEffect(() => {
    let temp = [...schedules]; // 원본 배열을 직접 수정하지 않도록 복사
    if (filters.shareScope) {
      temp = temp.filter(s => String(s.shareScope) === filters.shareScope);
    }
    if (filters.alarmTarget) {
      temp = temp.filter(s => String(s.alarmTarget) === filters.alarmTarget);
    }
    if (filters.keyword) {
      temp = temp.filter(s =>
        (s.description && s.description.includes(filters.keyword)) ||
        (s.scheduleID && s.scheduleID.toString().includes(filters.keyword))
      );
    }
    setFiltered(temp);
  }, [filters, schedules]);
  
  // [추가] useMemo를 사용해 현재 월의 일정을 날짜별로 미리 그룹화 (성능 최적화)
  const monthlySchedules = useMemo(() => {
    const groups = {};
    filtered.forEach(schedule => {
      // [수정] startTime이 유효한지 먼저 확인
      if (!schedule.startDate) return;
      
      const scheduleDate = new Date(schedule.startDate);
      // [수정] 날짜 객체가 유효한지 확인
      if (isNaN(scheduleDate.getTime())) return;

      if (scheduleDate.getFullYear() === currentDate.getFullYear() && scheduleDate.getMonth() === currentDate.getMonth()) {
        const day = scheduleDate.getDate();
        if (!groups[day]) {
          groups[day] = [];
        }
        groups[day].push(schedule);
      }
    });
    return groups;
  }, [filtered, currentDate]);

  const totalPages = Math.ceil(total / limit);

  // 달력 관련 함수들 (기존 로직 유지 가능)
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const changeMonth = (increment) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + increment);
      return newDate;
    });
  };

  // [수정] 달력 렌더링 함수를 최적화된 monthlySchedules 데이터 사용하도록 변경
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const daySchedules = monthlySchedules[day] || []; // 미리 그룹화된 데이터 사용
      days.push(
        <div key={day} className="calendar-day">
          <div className="day-number">{day}</div>
          {daySchedules.length > 0 && (
            <div className="schedule-indicator">
              {daySchedules.slice(0, 2).map(schedule => (
                <div key={schedule.scheduleID} className="schedule-item">
                  {schedule.description}
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
          {weekDays.map(d => <div key={d} className="weekday">{d}</div>)}
        </div>
        <div className="calendar-grid">{days}</div>
      </div>
    );
  };
  
  // [수정] 일정 목록 렌더링 함수도 monthlySchedules 데이터 사용
  const renderScheduleList = () => {
    // 날짜(key) 오름차순으로 정렬
    const sortedDays = Object.keys(monthlySchedules).sort((a, b) => Number(a) - Number(b));

    if (sortedDays.length === 0) {
        return <div className="schedule-list-view"><p>해당 월에 일정이 없습니다.</p></div>
    }

    return (
      <div className="schedule-list-view">
        {sortedDays.map(day => (
          <div key={day} className="date-group">
            <h4 className="date-header">{currentDate.getMonth() + 1}월 {day}일</h4>
            {monthlySchedules[day].map(schedule => (
              <div key={schedule.scheduleID} className="schedule-list-item">
                <div className="schedule-title">{schedule.description}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // [추가] 안전한 날짜 포매팅 함수
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '-'; // 날짜가 없으면 - 표시
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) return '유효하지 않은 날짜'; // 날짜 형식이 잘못되었을 경우
    return date.toLocaleString();
  };

  const handleSubmit = async (formData) => {
    try {
      await createSchedule(formData);
      setShowRegister(false); // 폼 닫기
      fetchSchedules(); // 목록 새로고침
      alert('일정이 성공적으로 등록되었습니다.');
    } catch (err) {
      console.error("등록 에러 상세:", err);
      // 기존 에러 처리 로직
      if (Array.isArray(err.detail)) {
        const messages = err.detail.map((e) => `${e.loc.slice(-1)[0]}: ${e.msg}`).join("\n");
        alert(messages);
      } else if (typeof err.detail === "string") {
        alert(err.detail);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="schedule-list-container">
      <h2>일정 조회</h2>
      
      <div className="view-mode-selector">
        <label>
          <input type="radio" name="viewMode" value="list" checked={viewMode === 'list'} onChange={(e) => setViewMode(e.target.value)} /> 목록 보기
        </label>
        <label>
          <input type="radio" name="viewMode" value="calendar" checked={viewMode === 'calendar'} onChange={(e) => setViewMode(e.target.value)} /> 달력 보기
        </label>
      </div>

      <div className="filters">
        <select value={filters.shareScope} onChange={e => setFilters({ ...filters, shareScope: e.target.value })}>
          <option value="">공유 범위</option>
          {SHARE_SCOPE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        {/* 주석 처리된 부분 복원 */}
        <select value={filters.alarmTarget} onChange={e => setFilters({ ...filters, alarmTarget: e.target.value })}>
          <option value="">알림 대상</option>
          {ALARM_TARGET_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        <input type="text" placeholder="제목/일정 ID" value={filters.keyword} onChange={e => setFilters({ ...filters, keyword: e.target.value })} />
        <button onClick={() => setShowRegister(true)}>일정 등록</button>
      </div>

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
                <tr key={schedule.scheduleID} onClick={() => navigate(`/schedules/${schedule.scheduleID}`)}>
                  <td>{schedule.scheduleID}</td>
                  <td>{schedule.description}</td>
                  {/* [수정] 안전한 날짜 포매팅 함수 사용 */}
                  <td>{formatDateTime(schedule.startDate)}</td>
                  <td>{formatDateTime(schedule.endDate)}</td>
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
          onSubmit={handleSubmit}
          onCancel={() => setShowRegister(false)}
        />
      )}
    </div>
  );
}