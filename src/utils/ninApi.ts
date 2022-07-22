const baseURL = "https://hmis-dev.health.go.ug/db-api/api/v2";
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhIjoiJDJiJDEyJGMuMFFCZ1RRbVI5ZE1GcFcyWXhiZS5NVG5JdmZ4M2s0Qi40bjJiYzdaY2hpWFcxY1BuQk8yIiwidXNlciI6ImFkbWluMiJ9.nRYsIQpcXK4yQlvKlpZkvW1XnNr21MXf9puzgCtpmfA";


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
