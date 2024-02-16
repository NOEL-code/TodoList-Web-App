import React, { useEffect } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import {Link} from "react-router-dom";

const EXPAND_BREAKPOINT = "md";
import { useRecoilState } from 'recoil';
import {userInfoState} from '~/stores/auth'

// eslint-disable-next-line react/prop-types
export default function MyNavbar({ brandTitle, offCanvasTitle }) {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)

  const AUTH_KEY = "AUTH_USER";
  
  const onLogout = (() => {
    setUserInfo(null);
    sessionStorage.removeItem(AUTH_KEY);
  });

  useEffect(()=> {
    const userStr = sessionStorage.getItem(AUTH_KEY);
    if(userStr){
      setUserInfo(JSON.parse(userStr));
    }
  }, []);
  


  return (
    <Navbar
      expand={EXPAND_BREAKPOINT}
      className="mb-3"
      sticky="top"
      bg="dark"
      variant="dark"
    >
      <Container fluid>
        <Navbar.Brand href="#">{brandTitle}</Navbar.Brand>
        <Navbar.Toggle aria-controls={`Navbar-expand-${EXPAND_BREAKPOINT}`} />
        <Navbar.Offcanvas
          id={`Navbar-expand-${EXPAND_BREAKPOINT}`}
          aria-labelledby={`NavbarLabel-expand-${EXPAND_BREAKPOINT}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`NavbarLabel-expand-${EXPAND_BREAKPOINT}`}>
              {offCanvasTitle || brandTitle}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="flex-row-reverse">
            <Nav
              className={`justify-content-around flex-row pb-4 pb-${EXPAND_BREAKPOINT}-0`}
            >
              {
                userInfo ? 
                  <Nav.Link as='div' onClick={onLogout}className="flex-grow-1 text-center border border-dark border-end-0">
                    로그아웃
                  </Nav.Link>
                  
                :
                <>
                  <Link to={'/login'} preventScrollReset className="flex-grow-1 text-center border border-dark border-end-0 text-decoration-none">
                    <Nav.Link as='div' className="flex-grow-1 text-center border border-dark border-end-0">
                        로그인
                    </Nav.Link>
                  </Link>

                  <Link to={'/register'} preventScrollReset className="flex-grow-1 text-center border border-dark border-end-0 text-decoration-none">
                  <Nav.Link as='div' className="flex-grow-1 text-center border border-dark">
                    회원가입
                  </Nav.Link >
                </Link>
                </>
              }
                
                
                
            </Nav>
            <Nav className="justify-content-start flex-grow-1 pe-3">
            <Link to={'/'} preventScrollReset className="text-decoration-none"> 
              <Nav.Link as='div'>
                Home
              </Nav.Link>
            </Link>
              
            <Link to={'/board'} preventScrollReset className="text-decoration-none">
              <Nav.Link as='div'>           
                게시판
              </Nav.Link>
            </Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}