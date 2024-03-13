import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import useHistory
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { PostLogin } from '~/lib/apis/login';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfoState } from '~/stores/auth';

function Login() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const navigate = useNavigate();
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const AUTH_KEY = 'AUTH_USER';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await PostLogin(state);
      const user = response.data;
      console.log(user.token);

      if (user.token) {
        setUserInfo(user);
        sessionStorage.setItem(AUTH_KEY, JSON.stringify(user));
        navigate('/');
      } else {
        alert('Error logging in');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name='email'
          value={state.email}
          onChange={handleChangeState}
          type='email'
          placeholder='Enter email'
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          name='password'
          value={state.password}
          onChange={handleChangeState}
          type='password'
          placeholder='Password'
        />
      </Form.Group>

      <Button variant='secondary' type='submit'>
        로그인
      </Button>

      <Link to={'/register'} className='ml-2' style={{ float: 'right' }}>
        계정이 없으시다면 여기를 눌러주세요.
      </Link>
    </Form>
  );
}

export default Login;
