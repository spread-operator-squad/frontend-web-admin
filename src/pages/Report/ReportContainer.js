import React from 'react'
import { Table, Divider, message } from 'antd';
import { fetchReport } from '../../services/reportService';
import Page from '../../components/Page/Page';
import { ReportAction } from '../../util/Action';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";

const columns = [
    {
        title: 'Customer Name',
        dataIndex: 'customerName',
        key: 'customerName',
        render: text => <Link to={"#"}>{text}</Link>,
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
                <Link to={"#"}>Edit</Link>
                <Divider type="vertical" />
                <Link to={"#"}>Delete</Link>
            </span>
        ),
    },
];

class ReportContainer extends React.Component {
    state = {
        isLoading: true,
        status: false,
    };

    componentDidMount() {
        this.fetchAllReport().then(
            this.setState({isLoading: false, status: true})
        )
    }

    render() {
        return (
            <Page inner>
                <Table loading={this.state.isLoading} rowKey={record => record.id} columns={columns} dataSource={this.props.reports} />
            </Page>
        )
    }

    fetchAllReport = async () => {
        const response = await fetchReport();
        if (response.type === 'error') return message.warning(response.message);
        this.props.dispatch({type: ReportAction.FETCH_REPORTS, payload: response})
    }
}

const mapStateToProps= (state) => ({
    ...state.reports
})

export default connect (mapStateToProps)(ReportContainer);
