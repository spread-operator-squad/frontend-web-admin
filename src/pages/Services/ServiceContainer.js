import React from 'react';
import { Table, Divider, Tag, message } from 'antd';
import { fetchService } from '../../services/servicesService';

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

class ServiceContainer extends React.Component{
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

    fetchAllService= async () => {
        const response = await fetchService();
        if (response.type === 'error') return message.warning(response.message);
        this.setState({...this.state.data, data: response});
    }
}

export default ServiceContainer;