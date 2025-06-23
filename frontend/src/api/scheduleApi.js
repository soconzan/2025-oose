const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// 이 함수는 이전 버전의 필드명을 사용하므로 제거하거나 수정해야 합니다.
// 지금은 createSchedule에서 직접 데이터를 처리하므로 제거합니다.
/*
function toPayload(form) {
  return {
    scheduleName: form.scheduleName,
    startDate: form.startDate,
    endDate: form.endDate,
    shareScope: form.shareScope,
    alarmStartTime: form.alarmStartTime,
    alarmTarget: form.alarmTarget,
  };
}
*/

export async function createSchedule(formData) {
  // const payload = toPayload(form); // 더 이상 toPayload를 사용하지 않음
  const res = await fetch(`${BASE_URL}/api/schedules`, { // URL에 /api 추가
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData), // 컴포넌트에서 받은 데이터를 그대로 사용
  });

  if (!res.ok) {
    const body = await res.json();
    throw body;
  }
  
  // 성공적으로 생성되었으나 내용이 없는 경우 (201, 204) 처리
  if (res.status === 201 || res.status === 204) {
    return {}; 
  }

  return res.json();
}