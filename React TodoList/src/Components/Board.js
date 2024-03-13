import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Board() {
  const [boardDetails, setBoardDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/board");
        const data = response.data.map((el) => ({
          id: el._id,
          title: el.title,
          content: el.content,
          author: el.author,
          createdAt: el.createAt,
        }));
        setBoardDetails(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div>영화 리스트</div>
      <ul>
        {boardDetails.map((el) => (
          <li key={el.id}>
            <div key={el.title}>Title: {el.title}</div>
            <div key={el.title}>Content: {el.content}</div>
            <div key={el.title}>Author: {el.author}</div>
            <div key={el.title}>CreateAt: {el.createAt}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
