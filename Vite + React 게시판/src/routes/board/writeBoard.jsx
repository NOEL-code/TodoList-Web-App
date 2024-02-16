import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PostBoard } from '~/lib/apis/board';



export default function WritePage() {
    const navigate = useNavigate();

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
          const response = await PostBoard(state);
          console.log(response);
          navigate('/board');

        } catch (error) {

          console.error('Error logging in:', error);

        }
    };

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
