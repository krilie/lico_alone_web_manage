import React from "react";
import "./Management.css"
import {Redirect, Route, Switch} from "react-router-dom";
import LoginPage from "./login-page/LoginPage";
import ManagePage from "./manage-page/ManagePage";
import {GetUserToken} from "../../utils/LocalStorageUtil";

export default class Management extends React.Component {

    componentWillMount() {
        const token = GetUserToken();
        if (token === "")
            this.goToPage(`/login`);
    }

    goToPage = path => {
        this.props.history.push(path);
    };

    render() {
        return (
            <div>
                <div className="management-view">网站管理页面</div>
                <Switch>
                    <Route exact path={`/login`} component={LoginPage}/>
                    <Route path={`/manage`} component={ManagePage}/>
                    <Redirect path={`/`} to={{pathname: `/manage`}}/>
                </Switch>
            </div>
        );
    }
}