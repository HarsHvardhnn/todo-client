import React, { useContext, useState } from 'react';
import axios from 'axios';
import { usernameContext } from '../../context/context';


const AddTask = ({onTaskAdd}) => {
  const [name, setName] = useState('');
  const {username} = useContext(usernameContext)
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); 
     
    axios.post(`http://localhost:3000/user/${username}/addTask` , {name:name , description:description}).then((res)=>{
        if(res.status === 201){
            console.log('task added');
            onTaskAdd();
        }

    }).catch((err) => {
        console.log(err);
    })

    console.log('Submitted:', { name, description });
    setName('');
    setDescription('');
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Add Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <button type="submit" className="bg-[#eb5779ec] hover:bg-[#941D39] text-white py-2 px-4 rounded-md  transition-colors duration-300">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
