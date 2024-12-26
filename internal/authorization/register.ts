import { BACKEND_URL } from "@/constants/backend"
import axios, { AxiosResponse } from "axios"

interface RegisterUserPayload {
	name: string,
	nis: string,
	password: string,
}

export default async function registerUser({ name, nis, password }: RegisterUserPayload): Promise<boolean> {
	try {
		const response: AxiosResponse = await axios.post(`${BACKEND_URL}/user/register`, {
			name,
			nis,
			password,
		});
		if (response.data.message) {
			return true
		}
		return false
	} catch (e) {
		return false
	}
}
