import instance from './base';

export async function PostLogin(data) {
  const response = await instance.post('/login', data);
  return response;
}

export async function PostLogout(data) {
  const response = await instance.post('/logout', data);
  return response;
}
