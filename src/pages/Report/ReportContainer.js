import React from 'react'
import { Table, Divider, Tag, message } from 'antd';

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

class ReportContainer extends React.Component{
    state = {
        data: []
    }

    componentDidMount(){
        this.fetchAllService();
    }

    render(){
        return(
            <Table columns={columns} dataSource={this.state.data} />
        )
    }

    fetchAllReport= async () => {
        const response = await fetchReport();
        if (response.type === 'error') return message.warning(response.message);
        this.setState({...this.state.data, data: response});
    }
}

export default ReportContainer;