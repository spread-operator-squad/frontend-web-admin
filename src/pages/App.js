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
import {
    getPathRedirect,
    getUserDetail,
    isAuthenticated
} from "../services/authenticationService";
import UserContainer from "./User/UserContainer";
import ServiceContainer from './Services/ServiceContainer';
import ItemContainer from './Item/ItemContainer';
import OperatorContainer from './Operator/OperatorContainer';
import ReportContainer from './Report/ReportContainer';
import {connect} from "react-redux";
import {StoresAction} from "../util/Action";
import {getUserById} from "../services/userService";
import {getStoreByOwnerId, isSelectedStore, saveSelectedStore} from "../services/storeService";
import StoreModal from "./Store/StoreModal";
import SelectStore from "./Store/SelectStore";

const {Content, Footer, Sider} = Layout;

class App extends React.Component {
    state = {
        user: {
            userDetail: {}
        },
        collapsed: false,
        isHaveStore: true
    };

    componentDidMount = async() =>{
        const user = await getUserById(getUserDetail());
        this.setState({...this.state, user: user});
        if (!isAuthenticated()) {
            message.warning("Please Login !");
            return this.props.history.push(getPathRedirect())
        }
        this.preparedSetData(user);
    };

    preparedSetData = async (user) => {
        this.setState({...this.state, user: user});
        if (user !== undefined) {
            const stores = await getStoreByOwnerId(user.id);
            if (stores.length !== 0) this.setState({...this.state, isHaveStore: true});
            this.props.dispatch({type: StoresAction.FETCH_STORES, payload: stores});
        }
    };

    setSelectedStore = (store) => {
        saveSelectedStore(store);
        message.success(`You selected ${store.name}`);
    };

    validateStore = (role) => {
        const {stores} = this.props;
        const {user, isHaveStore} = this.state;
        if (role === 'owner') {
            if (getUserDetail() != null) {
                if (!(isHaveStore)) {
                    return <StoreModal title={'Create a new store'} owner={user} visible={true} cancel={false}/>
                }
                else if (!(isSelectedStore())) {
                    if(stores.length > 0) {
                        return (
                            <SelectStore stores={stores} onClick={this.setSelectedStore}/>
                        )
                    }
                }
            }
        }
    };

    onCollapse = collapsed => {
        this.setState({collapsed});
    };

    render() {
        const {path, url} = this.props.match;
        const role = path.substr(1);
        const {user} = this.state;
        return (
            <Router>
                {this.validateStore(role)}
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
        stores: [...state.stores.stores]
    }
};

export default connect(mapStateToProps)(withRouter(App));
