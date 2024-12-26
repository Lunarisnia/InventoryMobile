import { BACKEND_URL } from "@/constants/backend";
import axios, { AxiosError, AxiosResponse } from "axios";

export interface UserInfo {
	name: string
	nis: string
}

export interface GetUserInfoResponse {
	message: UserInfo
}

export default async function getUserInfo(token: string): Promise<UserInfo> {
	try {
		const response: AxiosResponse = await axios.get(`${BACKEND_URL}/user/info`, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		})
		return (response.data as GetUserInfoResponse).message;
	} catch (e) {
		const axiosError = e as AxiosError;
		console.log("Error: ", axiosError.request, token);
		return { name: "", nis: "" } as UserInfo;
	}
}
