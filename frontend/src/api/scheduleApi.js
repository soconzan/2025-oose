const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

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

export async function createSchedule(form) {
  const payload = toPayload(form);
  const res = await fetch(`${BASE_URL}/schedules`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const body = await res.json();
  if (!res.ok) throw body;
  return body;
}