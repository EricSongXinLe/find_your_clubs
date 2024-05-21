import * as React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './Home';
import Signup from './components/Signup'
import Login from './components/Login'

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
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}