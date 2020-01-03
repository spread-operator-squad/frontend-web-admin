import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './assets/main.css';
import App from "./pages/App";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./pages/Auth/Login/Login";
import Registration from "./pages/Auth/Registration/Registration";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path={"/login"}><Login/></Route>
            <Route path={"/register"}><Registration/></Route>
            <Route path={"/forgot-password"}><ForgotPassword/></Route>
            <Route exact path="/admin" component={App}/>
            <Route exact path="/owner" component={App}/>
        </Switch>
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
