// 路由跳转
import { Route, Switch, Redirect, withRouter } from "react-router-dom"
import { Menu,Col, Row } from 'antd';
import './index.scss'
// 样式
import 'antd/dist/antd.css';
import React from 'react';


class NavTab extends React.Component {
    state = {
        menu: [{
            text: '用户管理',
            path: '/mainContainer/user',
            name: 'user',
        },
        {
            text: '商品管理',
            path: '/mainContainer/goods',
            name: 'goods',
        },
        {
            text: '订单管理',
            path: '/mainContainer/orders',
            name: 'orders',
        },
        {
            text: '评论管理',
            path: '/mainContainer/comments',
            name: 'comments',
        }],
        current: '/user',
    }

    // 方法： 跳转路由
    handleClick = key => {
        this.props.history.push(key.key);
        this.setState({
            current: key.key,
        });
        console.log(this.props, 999);

    }
    UNSAFE_componentWillMount() {
        this.props.history.listen( (route)=>{
            let {pathname} = route
            pathname =  pathname == '/' || '/mainContainer' ? '/mainContainer/user' : pathname
            this.setState({
                current : pathname
            })
        })
    }
    render() {
        const { menu, current } = this.state
        return (
            <div className="nav">
                <Menu mode='vertical' onClick={this.handleClick} selectedKeys={[current]} className="menu">
                    {
                        menu.map(item => <Menu.Item
                            key={item.path}
                            icon={item.icon
                            }> {item.text}
                        </Menu.Item>)
                    }
                </Menu>
            </div>

        )
    }

}
NavTab = withRouter(NavTab)//高阶组件 
export default NavTab
