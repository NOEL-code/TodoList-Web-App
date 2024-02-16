import {useState} from "react";

export default function TodoListUp() {
    const [text, setText] = useState("");
    const [todo, setTodoList] = useState([]);

    const onInput = (e) => {
        e.preventDefault();
        if (text === "") {
            return;
        }
        setTodoList((currentArray) => [
            text, ...currentArray
        ]);
        setText("");
    };

    const onDelete = (deleteIndex) => {
        setTodoList(
            (currentArray) => currentArray.filter((_, index) => index !== deleteIndex)
        );
    };

    const onUpdate = (updateIndex) => {
        const updatedText = prompt("Enter the updated text:", todo[updateIndex]);
        if (updatedText !== null) {
            setTodoList((currentArray) => currentArray.map((item, index) => (
                index === updateIndex
                    ? updatedText
                    : item
            )));
        }
    };

    const onChange = (e) => {
        setText(e.target.value);
    };

    return (
        <div className="App">
            <h1>Todo APP</h1>

            <input type="text" onChange={onChange} placeholder="입력하세요" value={text}/>
            <button onClick={onInput}>입력</button>

            <div>
                <ul className="list">
                    {
                        todo.map((item, index) => (
                            <li key={index}>
                                {item}
                                <button onClick={() => onUpdate(index)}>
                                    수정
                                </button>
                                <button onClick={() => onDelete(index)}>삭제
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}
