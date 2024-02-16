import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import * as divideHangul   from "hangul-util";

export default function Todo() {
  const [text, setText] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [colorIndex, setColorIndex] = useState(null);
  const [searchText, setSearchText] = useState("");

  const colorMap = [
    { color: '#00ff00' },
    { color: '#7fff00' },
    { color: '#adff2f' },
    { color: '#98fb98' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/todo");
        const data = response.data.map((el) => ({
          id: el._id,
          text: el.content,
          color: el.color,
          isUpdate: false,
          choText: el.choText
        }));
        setTodoList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const onChange = (e) => {
    setText(e.target.value);
  }
  const onSearchChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
  }

  const searched = todoList.filter((item) =>{
    try {
      console.log(todoList);
      if(typeof item.choText !== 'undefined') {
        return item.choText.includes(searchText)
      }
    } catch (error) {
      
    }
  });




  const onInput = async () => {
    if (typeof text == "undefined" || text === "" || text == null) return;
  
    const div_Hangul = divideHangul.divideHangulByGroups(text);
    let choText = ''; 
    for (let i = 0; i < div_Hangul.length; i++) {
        choText += div_Hangul[i][0]; 
    }
    
 
    const response = await axios.post("http://127.0.0.1:8000/todo", {
      content: text,
      color: colorMap[colorIndex]?.color || 'white',
      isUpdate: false,
      choText: choText
    });

    const newTodo = {
      id: response.data._id,
      text: text,
      isUpdate: false,
      color: colorMap[colorIndex]?.color || 'white',
      choText: choText
    };

    setTodoList([...todoList, newTodo]);
    setText("");
  }

  const onEdit = (idx) => {
    const updatedTodoList = [...todoList];
    updatedTodoList[idx].isUpdate = true;
    setTodoList(updatedTodoList);
  };

  const onUpdate = async (idx) => {
    const updatedTodo = todoList[idx];
  
    const div_Hangul = divideHangul.divideHangulByGroups(updatedTodo.text);
    let choText = ''; 
    for (let i = 0; i < div_Hangul.length; i++) {
        choText += div_Hangul[i][0]; 
    }
  
    await axios.put(`http://127.0.0.1:8000/todo/${updatedTodo.id}`, {
      content: updatedTodo.text,
      color: updatedTodo.color,
      isUpdate: false,
      choText: choText,
    });
  
    const updatedTodoList = [...todoList];
    updatedTodoList[idx].isUpdate = false;
    setTodoList(updatedTodoList);
  };
  

  const onDelete = async (idx) => {
    await axios.delete(`http://127.0.0.1:8000/todo/${todoList[idx].id}`);
    const updatedTodoList = [...todoList];
    updatedTodoList.splice(idx, 1);
    setTodoList(updatedTodoList);
  };

  return (
    <div className='text-center font-sans'>
      <div>
        <div className='text-green-500'>
          Todo App
        </div>

        <div>
          <input 
            placeholder='search...' 
            type='text' 
            value={searchText} 
            onChange={onSearchChange}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="입력하세요."
            value={text}
            onChange={onChange}
          />
          <Button variant='secondary' onClick={onInput}>입력</Button>

        </div>
        {searchText.length === 0 ? (
          <div> 
            {}    
          </div>
        ) : (
          
          searched.map((item, idx) => (
          <div key={idx} style={{ backgroundColor: item.color }}>
            <div key={item.id}>
              {item.text}
            </div>
          </div>
            ))
          )}

        <div style={{ display: 'flex', justifyItems: 'center',justifyContent: 'center'}}>
          {colorMap.map((elem, index) => (
            <div
              key={elem.color}
              onClick={() => {
                setColorIndex(index);
              }}
              style={{
                width: colorIndex === index ? '50px' : '20px',
                height: colorIndex === index ? '50px' : '20px',
                backgroundColor: elem.color,
                border: '1px solid',
                borderRadius: '5px',
                margin: '2px'
              }}>
            </div>
          ))}
        </div>
        <div>
          Todo item
        </div>
        <div>
          {todoList.map((todo, idx) => (
            <div key={idx} style={{ backgroundColor: todo.color }}>
              {todo.isUpdate ? (
                <div style={{ padding: '10px', margin: '20px' }}>
                  <input
                    type="text"
                    placeholder="수정하세요."
                    value={todo.text}
                    onChange={(e) => {
                      const updatedTodoList = todoList.map((t, i) => (
                        i === idx ? { ...t, text: e.target.value } : t
                      ));
                      setTodoList(updatedTodoList);
                    }}
                  />
                  <Button variant='secondary' onClick={() => onUpdate(idx)}>입력</Button>
                </div>
              ) : (
                <div style={{ padding: '10px', margin: '20px' }}>
                  {todo.text}
                  <Button variant='secondary' style={{ padding: '10px', margin: '5px' }} onClick={() => onEdit(idx)}>수정</Button>
                  <Button variant='secondary' style={{ padding: '10px', margin: '5px' }} onClick={() => onDelete(idx)}>삭제</Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
