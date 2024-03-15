import TodoItem from "./TaskItem";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { authContext, usernameContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import AddTask from "./AddTask";
import Spinner from "../Spinner";
interface Todo {
  _id: string;
  name: string;
  status: boolean;
}

const TodoList: React.FC = () => {
  const { username }: any = useContext(usernameContext);
  const [isLoading, setIsLoading] = useState(false);
  const { auth, setAuth }: any = useContext(authContext);
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get<Todo[]>(
        `http://localhost:3000/user/${username}/tasks/Alltasks`
      );
      setTodos(res.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  const onDelete = () => {
    fetchTasks();
  };

  const onTaskAdd = () => {
    fetchTasks();
  };
  useEffect(() => {
    if (!auth) {
      navigate("/");
      return;
    }
    fetchTasks();
  }, [auth, navigate, username]);

  return (
    <div className="w-full max-w-sm mx-auto px-4 py-8 bg-white rounded-lg shadow-md">
      <h1>user:{username}</h1>
      <h2 className="text-2xl font-medium mb-4">To Do List</h2>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="mt-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              text={todo.name}
              completed={todo.status}
              id={todo._id}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
      <div>
        <AddTask onTaskAdd={onTaskAdd} />
      </div>
      <div className="items-center flex justify-center">
      <button onClick={()=> {
        setAuth(false);
        navigate('/')
      }} className="bg-red-700 rounded-md p-4 text-white m-2 items-center">
        Logout
      </button>
      </div>
    </div>
  );
};

export default TodoList;
