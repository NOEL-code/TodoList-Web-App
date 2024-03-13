import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ListGroup, Button, Container, Card, Form } from 'react-bootstrap';
import { fetchCommentList } from '~/lib/apis/comment';
import { fetchUser } from '~/lib/apis/user';
import { PostComment } from '~/lib/apis/comment';
import { fetchBoardOneList } from '~/lib/apis/boardOne';
import { userInfoState } from '~/stores/auth';
import { useRecoilState } from 'recoil';

export default function BoardDetailPage() {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [board, setBoard] = useState({});
  const param = useParams();
  const [author, setAuthor] = useState('');
  const [commentText, setCommentText] = useState({
    content: '',
  });
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const onChangeCommentText = (e) => {
    setCommentText({
      ...commentText,
      [e.target.name]: e.target.value,
    });
  };

  const fetchCommentData = async () => {
    try {
      const response = await fetchCommentList(param.boardId);
      const data = response.data;
      setComments(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (commentText.content === '') {
      alert('내용을 입력하세요!');
      return;
    }
    if (!userInfo) {
      alert('로그인 하세요!');
      return;
    }
    try {
      const response = await PostComment(commentText, param.boardId);
      console.log(response);
      fetchCommentData();
      setCommentText({ content: '' });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchCommentData = async () => {
      try {
        const response = await fetchCommentList(param.boardId);
        const data = response.data;
        setComments(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCommentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.boardId]);

  useEffect(() => {
    const fetchBoardOneData = async () => {
      try {
        const response = await fetchBoardOneList(param.boardId);
        const data = response.data;
        setBoard(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchBoardOneData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchOneUserData = async () => {
      if (!board.author) {
        return;
      }

      try {
        console.log(board);
        const response = await fetchUser(board.author);
        const data = response.data;
        setAuthor(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchOneUserData();
  }, [board.author]);

  if (userInfo && comments) {
    console.log(userInfo._id);
    if (comments.author) {
      console.log(comments.author._id);
    }
  }

  return (
    <Container className='min-vh-100 mb-3 p-5 pt-3 pb-2'>
      {userInfo?._id === board.author ? (
        <Link to={`/modify/${board._id}`} key={board._id} preventScrollReset className='text-decoration-none'>
          <Button style={{ float: 'right' }} variant='secondary'>
            수정
          </Button>
        </Link>
      ) : (
        <div></div>
      )}

      <Button
        style={{ float: 'right' }}
        variant='secondary'
        onClick={(e) => {
          navigate(-1);
        }}
      >
        {'<'} Back
      </Button>
      <div className='board-detail'>
        <h1>Board Details</h1>
        <div style={{ padding: '50px' }}>
          <Card className='text-center'>
            <Card.Header>작성자: {author && author.nickname}</Card.Header>
            <Card.Body>
              <Card.Title>제목: {board.title}</Card.Title>
              <Card.Text>내용: {board.content}</Card.Text>
            </Card.Body>
            <Card.Footer className='text-muted'>작성일: {board.createAt?.split('T')[0]}</Card.Footer>
          </Card>
        </div>
      </div>
      <div className='comments-section' style={{ padding: '50px' }}>
        <h2>Comments</h2>
        <ListGroup as='ul'>
          {comments.map((comment, index) => (
            <ListGroup.Item key={index} as='li' action className='d-flex justify-content-between align-items-start p-3'>
              <div className='ms-2 me-auto'>
                <div>
                  <strong>{comment.author && comment.author.nickname}</strong>
                </div>
                <div>{comment.content}</div>
                <div>{comment.createAt?.split('T')[0]}</div>
              </div>

              {userInfo?._id === comments.author?._id ? (
                <Button
                  style={{ float: 'right', marginLeft: '10px', marginRight: '50px', marginBottom: '10px' }}
                  variant='secondary'
                >
                  수정
                </Button>
              ) : (
                <div></div>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div>
        <div>
          <Form>
            <Form.Group className='mb-3 p-5 pt-3 pb-2' controlId='exampleForm.ControlTextarea1'>
              <Form.Label>댓글 작성하기</Form.Label>
              <Form.Control
                as='textarea'
                name='content'
                value={commentText.content}
                onChange={onChangeCommentText}
                rows={3}
              />
            </Form.Group>
          </Form>
          <Container className='mb-3 p-5 pt-3 pb-2'>
            <div style={{ marginBottom: 20 }}>
              <Button variant='secondary' type='submit' onClick={handleSubmit}>
                완료
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </Container>
  );
}
