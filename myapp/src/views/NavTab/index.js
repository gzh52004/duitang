// 路由跳转
import { Route, Switch, Redirect, withRouter } from "react-router-dom"
import { Menu,Col, Row } from 'antd';
import User from './user'
import Goods from './goods'
import Orders from './orders'
import Comments from './comments'
import './index.scss'
// 样式
import 'antd/dist/antd.css';
import React from 'react';


class NavTab extends React.Component {
    state = {
        menu: [{
            text: '用户管理',
            path: '/user',
            name: 'user',
            component: User,
            // icon: <HomeOutlined />
        },
        {
            text: '商品管理',
            path: '/goods',
            name: 'goods',
            component: Goods,

        },
        {
            text: '订单管理',
            path: '/orders',
            name: 'orders',
            component: Orders,

        },
        {
            text: '评论管理',
            path: '/comments',
            name: 'comments',
            component: Comments,

        }],

        current: '/home',
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
        const { pathname } = this.props.location
        console.log(pathname);
        this.setState({
            current: pathname
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
                <Switch>
                    {
                        menu.map(item => <Route key={item.name} path={item.path} component={item.component} ></Route>)
                    }
                    <Route path="/notfound" render={() => <div>404</div>}></Route>
                    {/*重定向 有两个参数 exact精确匹配 */}
                    <Redirect from='/' to='/home' exact />
                    <Redirect to="/notfound" />
                </Switch>
            </div>

        )


    }

}
NavTab = withRouter(NavTab)//高阶组件 
export default NavTab
