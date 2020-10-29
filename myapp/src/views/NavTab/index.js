// 路由跳转
import { Route, Switch, Redirect, withRouter } from "react-router-dom"
import { Menu,Col, Row } from 'antd';
import './index.scss'


import React,{useEffect,useState,useContext,useLayoutEffect} from 'react';
import {MyContext} from '../../hook'

import './index.scss'
let initState = {
    menu: [{
        text: '用户管理',
        path: '/mainContainer/user',
        name: 'user',
    },
    {
        text: '发布管理',
        path: '/mainContainer/publish',
        name: 'orders',
    },
    {
        text: '商品管理',
        path: '/mainContainer/goods',
        name: 'goods',
    },
    {
        text: '评论管理',
        path: '/mainContainer/comments',
        name: 'comments',
    }],
    current: '/mainContainer/user',
}
function NavTab (props){
    let [menu,changeMune] = useState(initState.menu)
    let [current,changeCurrent] = useState(initState.current)
    let {state,dispatch} = useContext(MyContext)
    // 方法： 跳转路由
    const  handleClick = key => {
        dispatch({type:'ShowLogin',show : false})
        changeCurrent(key.key)
        props.history.push(key.key);
    }
    useEffect(()=>{
        props.history.listen( (route)=>{
            console.log('route')
            let {pathname} = route
            console.log(pathname,'rouet')
            pathname =  pathname == '/' ||  pathname =='/mainContainer' ? '/mainContainer/user' : pathname
            changeCurrent(pathname)
        })
        return ()=>{
            changeCurrent(null)
        }
    },[])
    return (
        <div className="nav">
            <Menu mode='vertical' onClick={handleClick} selectedKeys={[current]} className="menu">
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

NavTab = withRouter(NavTab)//高阶组件 
export default NavTab
