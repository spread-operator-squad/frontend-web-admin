import React from 'react'
import { Table, Divider, Tag, message } from 'antd';
import { fetchOperator } from '../../services/operatorService';
import Page from '../../components/Page/Page';

const columns = [
    {
        title: 'Name',
        dataIndex: 'username',
        key: 'username',
        render: text => <a>{text}</a>,
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

class OperatorContainer extends React.Component {
    state = {
        data: []
    }

    componentDidMount() {
        this.fetchAllOperator();
    }

    render() {
        return (
            <Page inner>
                <Table columns={columns} dataSource={this.state.data} />
            </Page>
        )
    }


    fetchAllOperator = async () => {
        const response = await fetchOperator();
        if (response.type === 'error') return message.warning(response.message);
        console.log("GET OPERATOR", response)
        this.setState({ ...this.state.data, data: response.operator });
    }
}

export default OperatorContainer