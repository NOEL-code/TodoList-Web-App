import instance from "./base";

export async function fetchBoardOneList(id) {
    const data = await instance.get(`/board/${id}`);
    return data;
}