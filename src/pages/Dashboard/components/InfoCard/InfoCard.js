import React from "react";
import CountUp from 'react-countup';
import {Card, Icon} from "antd";
import PropTypes from 'prop-types';

function InfoCard({icon, color, title, number, countUp}) {
    return (
        <Card
            className='infoCard'
            bordered={false}
            bodyStyle={{ padding: 10 }}
        >
            <Icon className='iconWarp' style={{ color }} type={icon} />
            <div className='content'>
                <p className='title'>{title || 'No Title'}</p>
                <p className='number'>
                    <CountUp
                        start={0}
                        end={number}
                        duration={2.75}
                        useEasing
                        useGrouping
                        separator=","
                        {...(countUp || {})}
                    />
                </p>
            </div>
        </Card>
    )
}

InfoCard.propTypes = {
    icon: PropTypes.string,
    color: PropTypes.string,
    title: PropTypes.string,
    number: PropTypes.number,
    countUp: PropTypes.object,
};

export default InfoCard;
