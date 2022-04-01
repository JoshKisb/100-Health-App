const baseURL = "https://nisprod.dev.plydot.com/api/v2";
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhIjoiJDJiJDEyJE12enBMUHdSSUlKN0NhOTh0UDhUQXU3S3VFQWJpNmFteWVSeGFPTFdIcGdKVEJlRlczUVBhIiwidXNlciI6ImFkbWluIn0.5f9cBgLGpsVUsYiuXC9NvVDQ4_eeB8MKzjI4wCCOENI";


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
