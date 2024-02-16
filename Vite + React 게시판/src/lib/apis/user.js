import instance from "./base";

export async function fetchUser(userId) {
    const data = await instance.get(`/user/${userId}`);
    return data;
}