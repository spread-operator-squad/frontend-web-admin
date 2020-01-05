import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Page extends Component {
    render() {
        const {children, loading = false, inner = false } = this.props;
        const loadingStyle = {
            height: 'calc(100vh - 184px)',
            overflow: 'hidden',
        };
        return (
            <div
                className={inner ? 'contentInner' : ''}
                style={loading ? loadingStyle : null}
            >
                {children}
            </div>
        )
    }
}

Page.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    loading: PropTypes.bool,
    inner: PropTypes.bool,
};
