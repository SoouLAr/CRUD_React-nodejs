import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Homepage from './homepage';
import {BrowserRouter as Router} from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css';


ReactDOM.render(
  <Router>
    <Homepage />
  </Router>,
  document.getElementById('root')
);
