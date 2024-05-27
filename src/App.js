import * as React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './Home';
import Signup from './Signup'
import Login from './login.js'
import Clubs from './Clubs'
import AddClub from './AddClub.js'
import ClubDetails from './clubDetail.js';
import Application from './application.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/clubs",
    element: <Clubs/>,
  },
  {
    path: "/clubsignup",
    element: <AddClub/>,
  },
  {
    path: "/club/:id",  
    element: <ClubDetails />,
  },{
    path: "/application",
    element: <Application/>,
  }
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}