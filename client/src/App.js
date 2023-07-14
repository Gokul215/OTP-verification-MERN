import React from 'react';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Username from './components/Username';
import Register from './components/Register';
import Recovery from './components/Recovery';
import Password from './components/Password';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';
import Profile from './components/Profile';

import { AuthorizeUser, ProtectRoute } from './middleware/auth'

const router=createBrowserRouter(
  [
    {
      path:'/',
      element:<Username></Username>
    },
    {
      path:'/Register',
      element:<Register></Register>
    },
    {
      path:'/Profile',
      element:<AuthorizeUser><Profile /></AuthorizeUser>
    },
    {
      path:'/Recovery',
      element:<Recovery></Recovery>
    },
    {
      path:'/Password',
      element: <ProtectRoute><Password /></ProtectRoute>
    },
    {
      path:'/Reset',
      element:<Reset></Reset>
    },
    {
      path:'*',
      element:<PageNotFound></PageNotFound>
    }
  ]
)
function App() {
  return (
  
   <div>
    <RouterProvider router={router}></RouterProvider>
   </div>
  );
}

export default App;
