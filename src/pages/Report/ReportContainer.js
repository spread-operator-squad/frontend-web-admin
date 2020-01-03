import React from 'react'
import { Table, Divider, Tag, message } from 'antd';
import { fetchReport } from '../../services/reportService';
import Page from '../../components/Page/Page';

const columns = [
    {
        title: 'Customer Name',
        dataIndex: 'customerName',
        key: 'customerName',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Put Date',
        dataIndex: 'dateStart',
        key: 'dateStart',
    },
    {
        title: 'Pickup Date',
        dataIndex: 'dateEnd',
        key: 'dateEnd',
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
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

class ReportContainer extends React.Component {
    state = {
        data: []
    }

    componentDidMount() {
        this.fetchAllReport();
    }

    render() {
        return (
            <Page inner>
                <Table columns={columns} dataSource={this.state.data} />
            </Page>
        )
    }

    fetchAllReport = async () => {
        const response = await fetchReport();
        if (response.type === 'error') return message.warning(response.message);
        this.setState({ ...this.state.data, data: response });
    }
}

export default ReportContainer;