import instance from './base';

export async function fetchCommentList(id) {
  const data = await instance.get(`/comment/${id}`);
  return data;
}

export async function PostComment(data, id) {
  const response = await instance.post(`/comment/${id}`, data);
  return response;
}

export async function deleteComment(data, id) {
  const response = await instance.delete(`/comment/${id}`, data);
  return response;
}

export async function putComment(data, id) {
  const response = await instance.put(`/comment/${id}`, data);
  return response;
}
