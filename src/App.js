import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Home from './Home';

/*Now there are bugs in giving the whole array as a parameter. CHECK that later!*/
export default function App() {
  return (
    <Home/>
  );
}