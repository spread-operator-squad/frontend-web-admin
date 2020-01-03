import React from 'react'
import { Table, Divider, Tag, message } from 'antd';
import { fetchItem } from '../../services/itemService';
import Page from '../../components/Page/Page';

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

class ItemContainer extends React.Component {
    state = {
        data: []
    }

    componentDidMount(){
        this.fetchAllItems();
    }

    render() {
        return (
            <Page inner>
                <Table columns={columns} dataSource={this.state.data} />                
            </Page>
        );
    }

    fetchAllItems= async () =>{
        const response = await fetchItem();
        if (response.type === 'error') return message.warning(response.message);
        console.log("GET RESPONSE", response);
        this.setState({...this.state.data, data: response});
    }
}

export default ItemContainer;