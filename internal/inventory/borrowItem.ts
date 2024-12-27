import { BACKEND_URL } from "@/constants/backend";
import axios, { AxiosResponse } from "axios";

export default async function borrowItem(itemCode: number, token: string) {
	try {
		const response: AxiosResponse = await axios.post(`${BACKEND_URL}/borrow-list/borrow`, {
			item_id: itemCode,
		}, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		})
		console.log(response)
	} catch (e) {
		console.log(e)
	}
}
