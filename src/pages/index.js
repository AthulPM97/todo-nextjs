import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // states
  const [todos, setTodos] = useState([]);
  
  // api url
  const apiUrl = "http://localhost:3000";

  // refs
  const todoRef = useRef("");

  // fetch stored todos from db
  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await axios.get(`${apiUrl}/api/todos`);
        const fetchedTodos = response.data.todos;
        if (fetchedTodos.length > 0) {
          setTodos(() => fetchedTodos);
        }
      } catch (err) {
        console.log("Error fetching todos ", err);
      }
    }
    fetchTodos();
  }, []);

  // add todo handler function
  const addTodoHandler = async () => {
    const requestObj = {
      text: todoRef.current.value,
    };
    try {
      const response = await axios.post(`${apiUrl}/api/todos`, requestObj);
      const data = response.data.data;
      setTodos(() => [...todos, data]);
    } catch (err) {
      console.log("error in addTodoHandler ", err);
    }
  };

  // delete todo handler function
  const deleteTodoHandler = async (id, e) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(`${apiUrl}/api/todos?id=${id}`);
      if (response.status == 204) {
        const newTodosArray = todos.filter((todo) => todo._id != id);
        setTodos(() => newTodosArray);
      }
    } catch (err) {
      console.log("error in deleteTodoHandler ", err);
    }
  };
  return (
    <>
      <Head>
        <title>Todo list by Athul</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <p>To-do List</p>
          <div>By Athul</div>
        </div>
        <div>
          <input className={styles.input} type="text" ref={todoRef} />
          <button className={styles.button} onClick={addTodoHandler}>
            Add Todo
          </button>
        </div>
        <div>
          <ul className={styles.ul}>
            {todos.map((todo) => (
              <li className={styles.li} key={todo._id}>
                {todo.text}
                <button
                  className={styles.delete}
                  onClick={deleteTodoHandler.bind(null, todo._id)}
                >
                  Delete Todo
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
