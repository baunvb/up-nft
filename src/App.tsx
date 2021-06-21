import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './layout/Layout';
import BlankPage from './screen/BlankPage/BlankPage';
import { isEthereumSupport } from './utils/Util';


function App() {

  if (!isEthereumSupport()) {
    return <BlankPage/>
  }

  return (
    <div>
      <Router>
        <Layout />
      </Router>
    </div>
  );
}

export default App;
