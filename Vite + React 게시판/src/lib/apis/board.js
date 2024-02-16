import instance from "./base";

export async function fetchBoardList() {
    const data = await instance.get('/board');
    return data;
}

export async function PostBoard(data) {
    const response = await instance.post('/board', data);
    return response;
}
export async function UpdateBoard(data, id) {
    const response = await instance.put(`/board/${id}`, data);
    return response;
}