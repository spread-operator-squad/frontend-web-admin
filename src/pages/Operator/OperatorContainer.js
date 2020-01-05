import React from 'react'
import { Table, Divider, Tag, message } from 'antd';
import { fetchOperator } from '../../services/operatorService';
import Page from '../../components/Page/Page';
import { OperatorAction } from '../../util/Action';
import { connect } from 'react-redux';

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
                <Divider type="vertical" />
                <a>Show Barcode</a>
            </span>
        ),
    },
];

class OperatorContainer extends React.Component {
    state = {
        isLoading: true,
        status: false
    }

    componentDidMount() {
        this.fetchAllOperator().then(
            this.setState({isLoading: false, status: true})
        )
    }

    render() {
        return (
            <Page inner>
                <Table loading={this.state.isLoading} rowKey={record => record.id} columns={columns} dataSource={this.props.operators.operator} />
            </Page>
        )
    }

    fetchAllOperator = async () => {
        const response = await fetchOperator();
        if (response.type === 'error') return message.warning(response.message);
        this.props.dispatch({type: OperatorAction.FETCH_OPERATORS, payload: response});
    }
}

const mapStateToProps = (state) => ({
    ...state.operators
})

export default connect (mapStateToProps)(OperatorContainer)