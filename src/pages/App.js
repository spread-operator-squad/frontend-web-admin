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
import {getJsonToken, getPathRedirect, isAuthenticated} from "../services/authenticationService";
import UserContainer from "./User/UserContainer";
import ServiceContainer from './Services/ServiceContainer';
import ItemContainer from './Item/ItemContainer';
import OperatorContainer from './Operator/OperatorContainer';
import ReportContainer from './Report/ReportContainer';
import {connect} from "react-redux";
import {StoresAction, UserDetailAction} from "../util/Action";
import {getUserById} from "../services/userService";
import {getStoreByOwnerId, isSelectedStore, saveSelectedStore} from "../services/storeService";
import StoreModal from "./Store/StoreModal";
import SelectStore from "./Store/SelectStore";

const {Content, Footer, Sider} = Layout;

class App extends React.Component {
    componentDidMount() {
        if (!isAuthenticated()) {
            message.warning("Please Login !");
            return this.props.history.push(getPathRedirect())
        }
        this.preparedSetData();
        return this.props.history.push(getPathRedirect().concat("dashboard"));
    }

    preparedSetData = async () => {
        const user = await getUserById(getJsonToken().jti);
        if (user !== undefined) {
            const stores = await getStoreByOwnerId(user.id);
            if (stores.length !== 0) this.setState({...this.state, isHaveStore: true});
            this.props.dispatch({type: StoresAction.FETCH_STORES, payload: stores});
            this.props.dispatch({type: UserDetailAction.SAVE_USER_DETAIL, payload: user})
        }
    };

    setSelectedStore = (store) => {
        saveSelectedStore(store);
        message.success(`You selected ${store.name}`);
    };

    validateStore = (user, role) => {
        const {stores} = this.props;
        if (role === 'owner') {
            if (user.id !== null) {
                if (!(this.state.isHaveStore)) {
                    return <StoreModal title={'Create a new store'} owner={user} visible={true} cancel={false}/>
                }
                if (!(isSelectedStore())) {
                    if(stores.length > 0) {
                        return (
                            <SelectStore stores={stores} onClick={this.setSelectedStore}/>
                        )
                    }
                }
            }
        }
    };

    state = {
        collapsed: false,
        isHaveStore: false
    };

    onCollapse = collapsed => {
        this.setState({collapsed});
    };

    render() {
        const {path, url} = this.props.match;
        const role = path.substr(1);
        const {user} = this.props;
        return (
            <Router>
                {this.validateStore(user, role)}
                <Layout style={{minHeight: '100vh'}}>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <div className="logo"/>
                        <Navigation role={role}/>
                    </Sider>
                    <Layout>
                        <TopBar name={user.userDetail.name} history={this.props.history}/>
                        <Content style={{margin: '0 16px'}}>
                            <Bread url={url} title="Dashboard" icon="dashboard"/>
                            <Switch>
                                {/*GLOBAL PAGE*/}
                                <Route exact path={`${path}/dashboard`}><Dashboard/></Route>

                                {/*ADMIN PAGE*/}
                                <Route path={`${path}/user`} component={UserContainer}/>

                                {/*OWNER PAGE*/}
                                <Route path={`${path}/store`}> Store </Route>
                                <Route path={`${path}/operator`} component={OperatorContainer}/>
                                <Route path={`${path}/service`} component={ServiceContainer}/>
                                <Route path={`${path}/item`} component={ItemContainer}/>
                                <Route path={`${path}/report`} component={ReportContainer}/>
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

const mapStateToProps = (state) => {
    return {
        user: {...state.user},
        stores: [...state.stores.stores]
    }
};

export default connect(mapStateToProps)(withRouter(App));
