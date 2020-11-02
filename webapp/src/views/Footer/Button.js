import React from 'react'

import { Button } from 'antd-mobile';

import '@/views/Footer/index.scss'
import { Router, useHistory,withRouter } from 'react-router-dom';
import {connect} from 'react-redux'
import userAction from '@/store/actions/user';
import {routes} from '@/router'

    // mapStateToProp函数用来定义传递什么数据到组件的props
let mapStateToProps = function (state) {
    console.log("mapStateToProps.state", state);
    return {
        isLogin:state.user.isLogin,
        userInfo:state.user.userInfo
    }
}
let mapDispatchToProps = function (dispatch) {
    // console.log("mipDispatchToProps.dispatch", dispatch);
    return {
        dispatch,
        logout() {
            // dispatch({ type: 'logout' })
// 因为编写action对象比较麻烦，引入了就可以直接使用userAction里面导出的方法logout并执行效果等同于上面的dispatch({ type: 'logout' })
            dispatch(userAction.logout())
        },
        // user为登录时传过去redux的必要用户信息借此信息来修改里面的信息
        login(user){
            dispatch(userAction.login(user))
        }
    }
    // bindActionCreators
// >利用redux的`bindActionCreators`把`ActionCreator`中默认导出的*所有*方法(export default中的方法)绑定到组件props并自动** 隐式调用dispatch(action)**

// 这里的写法等效于上面的return里面的所有方法执行
    // return bindActionCreators(userAction,dispatch)

}
@connect(mapStateToProps,mapDispatchToProps)
@withRouter
class But extends React.Component {
    state = {

    }
    changeTabs=(path)=>{
        console.log(path);
        console.log(this.props);
        this.props.history.push(path)
    }
    render() {
        let { dispatch, isLogin, logout,userInfo } = this.props
        return (
            <div className='msgbox' >
                {
                    isLogin
                        ?
                        <>
                            <div  >欢迎你{userInfo.result.username}</div>
                            <Button className='button' type="warning" size='small' inline  onClick={() => {
                                // dispatch({ type: 'logout' })
                                logout()
                            }}>退出</Button>
                        </>
                        :
                        <>
                            <Button className='button' type="primary" size='small' inline  onClick={
                                () => {
                                    this.changeTabs(routes[0].path)
                                }
                            }>登录</Button>

                            <Button className='button' type="warning" size='small' inline  onClick={
                                () => {
                                    this.changeTabs(routes[1].path)
                                }
                            }>注册</Button>
                        </>
                }

            </div>
        )
    }
}
export default But