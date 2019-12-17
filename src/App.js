import React from 'react';
import './App.css';
import Auth from './components/Auth';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import HomeUsers from './containers/HomeUsers';


function App() {
  
  return (
    <Router>
        <Route exact path="/" component={Auth}/>
        <Route path="/HomeUsers" component={HomeUsers}/>
    </Router>
    
  );
}

export default App;
