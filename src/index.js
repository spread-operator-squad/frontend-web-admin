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
import {Provider} from "react-redux";
import {reducers} from "./reducers/CombineReducers";
import {createStore} from "redux";
import {Redirect} from "react-router";

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Redirect exact from="/" to="/login" />
                <Route exact path={"/login"} component={Login}/>
                <Route path={"/register"} component={Registration}/>
                <Route path={"/forgot-password"} component={ForgotPassword}/>
                <Route path="/admin" component={App}/>
                <Route path="/owner" component={App}/>
            </Switch>
        </Router>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
