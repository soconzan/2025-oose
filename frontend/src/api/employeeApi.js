const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export async function createEmployee(form) {
  const res = await fetch(`${BASE_URL}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });

  const body = await res.json();
  if (!res.ok) throw body;
  return body;
}

export async function getEmployees() {
  const res = await fetch(`${BASE_URL}/employees`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const body = await res.json();
  if (!res.ok) throw body;
  return body;
}
