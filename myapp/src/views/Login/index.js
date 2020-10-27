import React,{useContext,useCallback,} from 'react';
import {withRouter} from 'react-router-dom'
import {MyContext} from '../../hook/index'


let Login = (props)=>{
    let {state,dispatch} = useContext(MyContext)
    const goto = useCallback(()=>{
        dispatch({type:'ShowLogin',show : false}) 
        props.history.replace('/maincontainer/user')
    },[])
    return (
        <div onClick={goto}>登录</div>
    )
}
Login = withRouter(Login)
export default Login
