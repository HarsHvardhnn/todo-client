import React, { useEffect } from 'react';
import Tab from './components/ToggleLogin/Tab';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { usernameContext ,authContext } from './context/context';
import TodoList from './components/Tasks/TaskScreen';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

const App = () => { 
  const [username , setUsername]= useState("");
  const [auth , setAuth] = useState(false);

  const router = createBrowserRouter([
    {
      path:'/',
      element: <Tab/>
    },
    {
      path:'/user',
      element: <TodoList/>
    }
  ]);
  
  return ( 
    <div className='w-full'>
      <authContext.Provider value={{auth, setAuth}}>
        <usernameContext.Provider value={{username, setUsername}}>
          <RouterProvider router={router}/>
          <ToastContainer />
        </usernameContext.Provider>
      </authContext.Provider>
    </div>
  );
};

export default App;
