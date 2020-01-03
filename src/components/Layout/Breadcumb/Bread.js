import React from "react";
import {Breadcrumb, Icon} from 'antd';
import PropTypes from 'prop-types';

function Bread({title, icon}) {
    return (
        <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item><Icon type={icon} /> {title}</Breadcrumb.Item>
        </Breadcrumb>
    )
}

Bread.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string
};

export default Bread;
