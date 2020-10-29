import React,{useContext,useCallback,} from 'react';
import {withRouter} from 'react-router-dom'
import { Form, Input, Button, Checkbox,message } from 'antd';
import {MyContext} from '../../hook/index'
import sha256 from 'crypto-js/sha256'


import request from '../../utils/request';
import './index.scss';

const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 17,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 3,
      span: 10,
    },
  };
  const TailLayout = {
    wrapperCol: {
      offset: 0,
      span:20,
    },
  };
let Login = (props)=>{
    let {state,dispatch} = useContext(MyContext)
    // const goto = useCallback(()=>{
        // dispatch({type:'ShowLogin',show : false}) 
    //     props.history.replace('/maincontainer/user')
    // },[])

    const onFinish = useCallback(async values=>{
        const {data} = await request.get('user/login',{
            params : {
                ...values,
                password : sha256(values.password).toString()
            }
        })
        if(data.code === 1){
            message.success('登录成功')  
            dispatch({type:'ShowLogin',show : false}) 
            dispatch({type:'Login',data:data.data,remember:values.remember})
            props.history.replace('/maincontainer/user')
        }else {
            message.error('用户名或者密码错误')
        }
    })
    const gotoLogin = useCallback(()=>{
        props.history.push('/reg')
    })
    return (
        <div className="LoginWarp">
            <div className="LoginBox">
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            >
            <Form.Item
                label="Username"
                name="username" 
                rules={[
                {
                    required: true,
                    message: '请输入用户名',
                }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                {
                    required: true,
                    message: '请输入密码',
                },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...TailLayout}>
                <Button 
                type="primary" 
                htmlType="submit"
                >
                登录
                </Button>
                <Button type="link"
                onClick={gotoLogin}
                >
                    没有帐号？请注册
                </Button>
            </Form.Item>
            </Form>
           
            </div>
           
        </div>
    )
}
Login = withRouter(Login)
export default Login
