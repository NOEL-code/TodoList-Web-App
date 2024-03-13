import React, { useState, useEffect } from 'react';
import { ListGroup, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchBoardList } from '~/lib/apis/board';
import { useRecoilState } from 'recoil';
import { userInfoState } from '~/stores/auth';
import { useNavigate } from 'react-router-dom';

export default function BoardListPage() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [boardDetails, setBoardDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBoardList();
        const data = response.data;
        setBoardDetails(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
        <div>
          <h1>My board</h1>
        </div>
        {userInfo ? (
          <Button
            variant='secondary'
            type='submit'
            style={{ padding: '5px', height: '50px' }}
            onClick={(e) => {
              navigate('/writePage');
            }}
          >
            게시글 작성
          </Button>
        ) : (
          <div> </div>
        )}
      </div>

      <ListGroup as='ul'>
        {boardDetails.map((board) => (
          <Link to={`/board/${board._id}`} key={board._id} preventScrollReset className='text-decoration-none'>
            <ListGroup.Item
              as='li'
              action
              className='d-flex justify-content-between align-items-start pd-5'
              style={{ padding: '10px' }}
            >
              <div className='ms-2 me-auto test-truncate'>
                <div className='fw-bold'>{board.title}</div>
                <div>{board.content}</div>
              </div>
              <Badge bg='primary' pill>
                {}
              </Badge>
            </ListGroup.Item>
          </Link>
        ))}
      </ListGroup>
    </>
  );
}
