import React from "react";
import Page from "../../components/Page/Page";
import {Tabs} from "antd";

const {TabPane} = Tabs;

const EnumUserStatus = {
    ACTIVE: 1,
    INACTIVE: 2
};

class UserContainer extends React.Component {
    handleTabClick = (key) => {
        const {history} = this.props;
        const {pathname} = this.props.location;
        return history.push({
            pathname,
            state: {
                status: key
            }
        });
    };

    render() {
        console.log(this.props)
        // console.log(this.props.location.state.status);
        return (
            <Page inner>
                <Tabs defaultActiveKey="1" onChange={this.handleTabClick}>
                    <TabPane tab="Inactive" key={EnumUserStatus.ACTIVE}>
                        Content of Tab Pane 1
                    </TabPane>
                    <TabPane tab="Active" key={EnumUserStatus.INACTIVE}>
                        Content of Tab Pane 2
                    </TabPane>
                </Tabs>
            </Page>
        );
    }
}

export default UserContainer;
