import { BACKEND_URL } from "@/constants/backend"
import axios, { AxiosResponse } from "axios"

interface LoginResponse {
	token: string
};

export async function login(nis: string, password: string): Promise<LoginResponse> {
	try {
		const result: AxiosResponse = await axios.post(`${BACKEND_URL}/user/login`, {
			nis: nis,
			password: password,
		});
		return result.data as LoginResponse;
	} catch (e) {
		console.log(e);
		return { token: "" } as LoginResponse;
	}
}
