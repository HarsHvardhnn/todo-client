// TodoItem.tsx
import { useState } from "react";
import axios from "axios";

interface TodoItemProps {
  text: string;
  completed: boolean;
  id: String;
}

const TodoItem: React.FC<TodoItemProps> = ({ text, completed, id ,onDelete }) => {
  const [edited, SetEdited] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const description = "demo";
  const deleteTask = async () => {
    try {
      console.log(id);
      const res = await axios.delete(`http://localhost:3000/user/task/deleteTask/${id}`);
      console.log(res.data);
      onDelete();
    } catch (err) {
      console.log(err);
    }
  };
  
  const updateTasks = async () => {
    console.log({ name: text, description: description, id: id });
    axios
      .put("http://localhost:3000/user/task/update", {
        name: edited,
        description: description,
        id: id,
      })
      .then((res) => {
        console.log("Response:", res.data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  return (
    <div className="flex justify-between items-center px-4 py-2 mb-2 border border-gray-200 rounded-lg">
      <div
        className={`flex items-center space-x-2 ${
          completed && "text-gray-500 "
        }`}
      >
        {isEditing ? (
          <input placeholder={edited || text}
            onChange={(e) => {
              SetEdited(e.target.value);
            }}
          />
        ) : (
          <span className="text-base font-medium">{edited || text} </span>
        )}
      </div>
      {isEditing ? (
        <button
          onClick={(e) => {
            setIsEditing(false);
            updateTasks();
          }}
        >
          Save
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="text-red-500 hover:text-red-700 focus:outline-none"
        >
          Edit
        </button>
      )}
        <button
          type="button"
          onClick={() => deleteTask()}
          className="text-red-500 hover:text-red-700 focus:outline-none"
        >
         Delete
        </button>
    </div>
  );
};

export default TodoItem;
