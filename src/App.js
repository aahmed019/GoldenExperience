import React from 'react';
import './App.css';
import Nav from './components/Navbar/Navbar'
import Login from './components/Login/Login.js';
import { HashRouter as Router, Route, Link, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Nav/> {/* Navigation component, the file directory for this is located above, every component will follow this format*/}
      <Switch>
            <Route exact path = '/Login' component = {Login}/>
            {/* <Route exact path = '/home' component = {}/> */}
      </Switch>
    </div>
    </Router>
  );
}

export default App;
