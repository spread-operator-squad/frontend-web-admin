import React from "react";
import {Icon, Menu} from "antd";
import {Constant} from "../../pages/utils/constants";
import {Link} from "react-router-dom";

function Navigation({role}) {
    return (
        <Menu theme="dark" mode="inline">
            {
                Constant.Navigation[role].map((item) => {
                    return (
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                <Icon type={item.icon}/>
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    )
                })
            };
        </Menu>

    )
}

export default Navigation;
