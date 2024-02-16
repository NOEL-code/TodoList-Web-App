import instance from './base';

export async function PostRegister(data) {
  const response = await instance.post('/signup', data); // Assuming your registration API endpoint is '/register'
  return response;
}
