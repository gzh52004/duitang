import React,{useContext,useCallback,} from 'react';
import {withRouter} from 'react-router-dom'
import { Form, Input, Button, Checkbox,message } from 'antd';
import {MyContext} from '../../hook/index'
import sha256 from 'crypto-js/sha256'

import './index.scss';
import request from '../../utils/request';

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
      offset: 0.5,
      span:20,
    },
  };
let Reg = (props)=>{
    let {state,dispatch} = useContext(MyContext)
    const goto = useCallback(()=>{
        props.history.push('/login')
    },[])
    const onFinish = useCallback(async values=>{
        // let {username,password,remember} = values
        values.password = sha256(values.password).toString()
        const {data} = await request.post('user/reg',{...values})
        if(data.code === 1){
            message.success('注册成功')
            props.history.replace('/login')
        }else{
            message.error('服务器错误')
        }
    })
    return (
        <div className="RegWarp">
            <div className="RegBox">
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
            <Form.Item {...TailLayout}>
                <Button 
                type="primary" 
                htmlType="submit"
                >
                注册
                </Button>
                <Button 
                type="link" 
                htmlType="submit"
                onClick={goto}
                >
                已经用帐号？请登录
                </Button>
            </Form.Item>
            </Form>
            </div>
           
        </div>
    )
}
Reg = withRouter(Reg)
export default Reg