const baseURL = "https://hmis-dev.health.go.ug/db-api/api/v2";
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhIjoiJDJiJDEyJEJtQlloeVBFVnNpVlVjNnUuNEF6Ri5YUzFrZmpsckE4SXpYR3dBblFodDAxclhWSzAzSUV5IiwidXNlciI6ImFkbWluIn0.J75FdCbtZEq0C6fMRt4eyLQKKrKBZXitw4NHnf9fKSo";


export const getNINPerson = nin => {
	return fetch(`${baseURL}/getPerson`, {
		method: 'POST',
		body: JSON.stringify({
			"nationalId": nin,
			"token": token
		}),
	})
	.then(response => response.json())
}

export const getNINPlaceOfBirth = nin => {
	return fetch(`${baseURL}/getPlaceOfBirth`, {
		method: 'POST',
		body: JSON.stringify({
			"nationalId": nin,
			"token": token
		}),
	})
	.then(response => response.json())
}
