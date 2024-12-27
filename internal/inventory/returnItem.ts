import { BACKEND_URL } from "@/constants/backend"
import axios from "axios"

export default async function returnItem(itemCode: number, returnCode: string, token: string) {
	try {
		await axios.post(`${BACKEND_URL}/borrow-list/return`, {
			item_id: itemCode,
			return_code: returnCode,
		}, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		})
	} catch (e) {
		console.log(e)
	}
}
