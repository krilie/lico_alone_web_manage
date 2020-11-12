import React from 'react';
import 'antd/dist/antd.css';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {BrowserRouter, Route} from 'react-router-dom'
import store from "./redux/RuduxIndex";
import Management from "./pages/management/Management";

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter basename='/'>
            <Route path={`/`} component={Management}/>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
