import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './layout/Layout';

function App() {
  return (
    <div>
      <Router>
        <Layout />
      </Router>
    </div>
  );
}

export default App;
