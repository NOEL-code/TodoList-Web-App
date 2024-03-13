import React from 'react';
import { Outlet } from 'react-router-dom';
import MyFooter from '~/components/MyFooter/MyFooter';
import MyNavbar from '~/components/MyNavbar/MyNavbar';
import { Container } from 'react-bootstrap';
const brand = 'My-React-Board';
export default function BoardLayout() {
  return (
    <>
      <MyNavbar brandTitle={brand} />
      <Container className='min-vh-100'>
        <Outlet />
      </Container>
      <MyFooter brandTitle={brand} />
    </>
  );
}
