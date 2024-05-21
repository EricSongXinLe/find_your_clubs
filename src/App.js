import * as React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/signin",
    element: <div>Sign In</div>,
  }
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}