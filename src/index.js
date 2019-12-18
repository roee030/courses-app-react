  
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import App from './App';
import UserContext from '../src/helpers/UserContext'
ReactDOM.render(
    
        <UserContext>
            <Router>
                <App/>
            </Router>
        </UserContext>

    ,document.getElementById('root'));