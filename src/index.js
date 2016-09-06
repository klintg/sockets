import React from 'react';
import {render} from 'react-dom';
import App from './components/app';
import './style/style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

render(
    <App/>,
  document.getElementById('app')
);
