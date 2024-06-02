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
import Apply from './application.js'
import Create from './create_application.js'
import ViewApp from './viewApp.js';

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
    path: "/club/:id",  // Add this route for club details
    element: <ClubDetails />,
  },{
    path: "/apply",
    element: <Apply/>,
  },
  {
    path: "/create",
    element: <Create/>,
  },{
    path: "/ViewApp",
    element: <ViewApp/>,
  }
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}