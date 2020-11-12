import React from 'react';
import 'antd/dist/antd.css';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import { HashRouter, Route} from 'react-router-dom'
import store from "./redux/RuduxIndex";
import Management from "./pages/management/Management";

ReactDOM.render((
    <Provider store={store}>
        <HashRouter basename='/'>
            <Route path={`/`} component={Management}/>
        </HashRouter>
    </Provider>
), document.getElementById('root'));
