import React from 'react';
import {Layout, message} from 'antd';
import TopBar from "../components/Layout/TopBar/TopBar";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter
} from "react-router-dom";
import Bread from "../components/Layout/Breadcumb/Bread";
import Dashboard from "./Dashboard";
import Navigation from "../components/Navigation/Navigation";
import {getPathRedirect, isAuthenticated} from "../services/authenticationService";
import UserContainer from "./User/UserContainer";
import ServiceContainer from './Services/ServiceContainer';
import ItemContainer from './Item/ItemContainer';
import OperatorContainer from './Operator/OperatorContainer';

const {Content, Footer, Sider} = Layout;

class App extends React.Component {
    componentDidMount() {
        if (!isAuthenticated()) {
            message.warning("Please Login !");
            return this.props.history.push(getPathRedirect())
        }
        return this.props.history.push(getPathRedirect().concat("dashboard"));
    }

    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        this.setState({collapsed});
    };

    render() {
        const {path, url} = this.props.match;
        const role = path.substr(1);

        return (
            <Router>
                <Layout style={{minHeight: '100vh'}}>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <div className="logo"/>
                        <Navigation role={role}/>
                    </Sider>
                    <Layout>
                        <TopBar history={this.props.history}/>
                        <Content style={{margin: '0 16px'}}>
                            <Bread url={url} title="Dashboard" icon="dashboard"/>
                            <Switch>
                                {/*GLOBAL PAGE*/}
                                <Route exact path={`${path}/dashboard`}><Dashboard/></Route>

                                {/*ADMIN PAGE*/}
                                <Route path={`${path}/user`} component={UserContainer}/>

                                {/*OWNER PAGE*/}
                                <Route path={`${path}/store`}> Store </Route>
                                <Route path={`${path}/operator`}> <OperatorContainer/> </Route>
                                <Route path={`${path}/service`}> <ServiceContainer/> </Route>
                                <Route path={`${path}/item`}> <ItemContainer/> </Route>
                                <Route path={`${path}/report`}> Report </Route>
                                <Route path={`${path}/chat`}> Chat </Route>
                                <Route path={`${path}/*`}>Not Found</Route>
                            </Switch>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>Copyright</Footer>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}

export default withRouter(App);
