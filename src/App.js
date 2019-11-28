import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Link } from "react-router-dom";
import Home from './pages/Home';
import Courses from './pages/Courses'
function App() {
  return (
      <Router>
      <Route exact path="/" component={Home}/>
      <Route exact path="/courses" component={Courses}/>
  </Router>
  );
}

export default App;
