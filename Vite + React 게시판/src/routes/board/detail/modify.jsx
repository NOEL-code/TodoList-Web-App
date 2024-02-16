import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { UpdateBoard } from '~/lib/apis/board';
import { fetchBoardOneList } from '~/lib/apis/boardOne';

export default function ModifyPage() {
    const navigate = useNavigate();
    const param = useParams(); 

    const [state, setState] = useState({
        title: "",
        content: "",
    })
    const handleChangeState = ((e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await UpdateBoard(state, param.boardId);
          console.log(response);
          navigate('/board');

        } catch (error) {

          console.error('Error logging in:', error);

        }
    };

    useEffect(() => {
        const fetchBoardOneData = async () => {
            try {
                const response = await fetchBoardOneList(param.boardId);
                const data = response.data
                setState({
                    title: data.title,
                    content: data.content,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchBoardOneData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="title" value={state.title} name="title" placeholder="title" onChange={handleChangeState} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" rows={3}  value={state.content} name="content" placeholder="content" onChange={handleChangeState}/>
                </Form.Group>
            </Form>   

            <Button variant="secondary" type="submit" onClick={handleSubmit} style={{ float: 'right', marginBottom: '15px', marginLeft: '15px'}}>
                완료
            </Button> 
            <Button
                style={{ float: 'right', marginBottom: '15px' }}
                variant="secondary"
                onClick={(e) => {
                    navigate(-1);
                }}
            >
                취소
            </Button>

            
        </>
    );
}
