import React from "react";
import {Card, Modal, Row} from "antd";

const {Meta} = Card;

class SelectStore extends React.Component {

    state = {
        visibility: true
    };

    handleClick = (element) => {
        this.props.onClick(element);
        this.setState({...this.state, visibility: false})
    };

    render() {
        return (
            <Modal
                centered
                visible={this.state.visibility}
                closable={false}
                footer={null}
                width={'auto'}
            >
                <h1 align={'center'}>Select Store</h1>
                <Row type="flex" style={{alignItems: 'center', justifyContent: 'center'}}>
                    {
                        this.props.stores.map(element => {
                            return (
                                <Card
                                    key={element.id}
                                    hoverable
                                    onClick={() => {this.handleClick(element)}}
                                    style={{width: 240, margin: '20px'}}
                                >
                                    <Meta style={{textAlign: 'center'}} title={element.name}/>
                                </Card>
                            )
                        })
                    }
                </Row>
            </Modal>
        );
    }
}

export default SelectStore;
