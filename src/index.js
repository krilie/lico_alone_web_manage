import React from 'react';
import 'antd/dist/antd.css';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom'
import Management from "./pages/management/Management";

ReactDOM.render((
    <BrowserRouter basename='/'>
        <Route path={`/`} component={Management}/>
    </BrowserRouter>
), document.getElementById('root'));
