import React from 'react';
import { Table, Divider, Tag, message } from 'antd';
import { fetchService } from '../../services/servicesService';
import Page from '../../components/Page/Page';
import { ServicesAction } from '../../util/Action';
import { connect } from 'react-redux';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
                <a>Edit</a>
                <Divider type="vertical" />
                <a>Delete</a>
            </span>
        ),
    },
];

class ServiceContainer extends React.Component {
    state = {
        isLoading: true,
        status: false
    }

    componentDidMount() {
        this.fetchAllService().then(
            this.setState({status: true, isLoading: false})
        )
    }

    render() {
        return (
            <Page inner>
                <Table loading={this.state.isLoading} rowKey={record => record.id} columns={columns} dataSource={this.props.services} />
            </Page>
        )
    }

    fetchAllService = async () => {
        const response = await fetchService();
        if (response.type === 'error') return message.warning(response.message);
        this.props.dispatch({ type: ServicesAction.FETCH_SERVICES, payload: response});
    }
}

const mapStateToProps = (state) => ({
    ...state.services
})

export default connect (mapStateToProps)(ServiceContainer);