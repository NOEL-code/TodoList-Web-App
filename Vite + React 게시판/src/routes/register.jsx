import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { PostRegister } from '~/lib/apis/register'; // Assuming you have an API endpoint for registration

function Register() {
  const [state, setState] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  });
  const navigate = useNavigate();

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (state.password !== state.passwordCheck) {
      return alert('Passwords do not match.');
    }
    try {
      const response = await PostRegister(state);
      console.log(response.data); // Assuming your registration API returns some data
      // Redirect user or perform actions after successful registration
    } catch (error) {
      console.error('Error registering:', error);
      // Handle registration error
    }
    
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name="email"
          value={state.email}
          onChange={handleChangeState}
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicNickname">
        <Form.Label>Nickname</Form.Label>
        <Form.Control
          name="nickname"
          value={state.nickname}
          onChange={handleChangeState}
          type="text"
          placeholder="Enter Nickname"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          value={state.password}
          onChange={handleChangeState}
          type="password"
          placeholder="Password"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPasswordCheck">
        <Form.Control
          name="passwordCheck"
          value={state.passwordCheck}
          onChange={handleChangeState}
          type="password"
          placeholder="Password Check"
        />
      </Form.Group>

      <Button variant="secondary" type="submit">
        Register
      </Button>

      <Link to={'/login'} className="ml-2" style={{ float: 'right' }}>
        Already have an account? Login here.
      </Link>
    </Form>
  );
}

export default Register;
