import { BACKEND_URL } from "@/constants/backend";
import axios from "axios";

export interface GetBorrowListResponse {
	id: number
	user_id: number
	item_id: number
	name: string
	image: string
	borrow_at: number
	returned_at: number | null
	created_at: number
	updated_at: number
}

export default async function getBorrowList(token: string): Promise<Array<GetBorrowListResponse>> {
	const response = await axios.get(`${BACKEND_URL}/borrow-list`, {
		headers: {
			Authorization: "Bearer " + token,
		},
	});
	return response.data.data as Array<GetBorrowListResponse>;
}
