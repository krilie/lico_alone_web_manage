import React from 'react';
import 'antd/dist/antd.css';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom'
import Management from "./pages/management/Management";

ReactDOM.render((
    <HashRouter basename='/'>
        <Route path={`/`} component={Management}/>
    </HashRouter>
), document.getElementById('root'));
