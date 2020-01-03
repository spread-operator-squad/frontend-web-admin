import React from "react";
import { Row, Col } from 'antd'
import {InfoCard} from './components';
import {Constant} from "../utils/constants";

const {Color} = Constant;

const numbers = [
    {
        icon: 'pay-circle-o',
        color: Color.green,
        title: 'Online Review',
        number: 2781,
    },
    {
        icon: 'team',
        color: Color.blue,
        title: 'Total Owner',
        number: 3241,
    },
    {
        icon: 'team',
        color: Color.blue,
        title: 'Total Customer',
        number: 3241,
    },
    {
        icon: 'shopping-cart',
        color: Color.red,
        title: 'Total Store',
        number: 4324,
    }
];

class Dashboard extends React.Component {
    render() {
        const infoCard = numbers.map((item, key) => (
            <Col key={key} lg={6} md={12}>
                <InfoCard {...item} />
            </Col>
        ));

        return (
            <Row gutter={24}>
                {infoCard}
            </Row>
        );
    }
}

export default Dashboard;
