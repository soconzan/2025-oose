const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function toPayload(form) {
  return {
    employeeId: form.employeeId,
    employeeNum: Number(form.employeeNum),
    name:        form.name,
    email:       form.email,
    phone:       form.phone,
    departmentId: Number(form.departmentId),
    position:    form.position,
    userType:    form.userType,
  };
}

export async function createEmployee(form) {
  const payload = toPayload(form);
  const res = await fetch(`${BASE_URL}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const body = await res.json();
  if (!res.ok) throw body;
  return body;
}
