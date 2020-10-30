import React, { useState } from "react";
import SHA256 from 'crypto-js/sha256';
import {connect} from 'react-redux'
import {
    NavBar,
    Icon,
    List,
    InputItem,
    Toast,
    Button,
    Flex,
    WhiteSpace,
    WingBlank,
} from "antd-mobile";
import { createForm } from "rc-form";

import "./index.scss";
import userAction from '@/store/actions/user';

function Login(props) {
    let { getFieldProps, getFieldError } = props.form;

    /* 正则校验：用户名 */
    const validateUserName = (rule, value, callback) => {
        // 仅允许输入英文和数字
        const reg = /^\w{4,8}$/;
        if (reg.test(value)) {
            callback();
        } else {
            callback(new Error("仅允许英文、数字长度为4到8"));
        }
    };

    /* 正则校验：密码 */
    const validatePassword = (rule, value, callback) => {
        if (!value) {
            callback(new Error("密码不能为空"));
        } else {
            callback();
        }
    };

    /* 登录 */
    const handleClick = () => {
        props.form.validateFields({ force: true }, (error) => {
            if (!error) {
                let values = props.form.getFieldsValue();
                // 加密
                values.password = SHA256(values.password).toString();

                return props.dispatch({
                    type:'login_async',
                    data:values
                })

            } else {
                Toast.info("填写数据格式不正确");
            }
        });
    }

    return (
        <>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => {
                    props.history.push("/main");
                }}
            ></NavBar>
            <section className="login">
                <h2>登录堆糖</h2>
                <WingBlank size="lg">
                    <List>
                        <InputItem
                            {...getFieldProps("username", {
                                validate: [
                                    {
                                        trigger: "onBlur",
                                        rules: [
                                            { validator: validateUserName },
                                        ],
                                    },
                                ],
                            })}
                            error={!!getFieldError("username")}
                            onErrorClick={() => {
                                Toast.info(getFieldError("username"), 2);
                            }}
                            clear
                            placeholder="请输入用户名"
                        >
                            用户名
                        </InputItem>

                        <InputItem
                            {...getFieldProps("password", {
                                validate: [
                                    {
                                        trigger: "onBlur",
                                        rules: [
                                            { validator: validatePassword },
                                        ],
                                    },
                                ],
                            })}
                            error={!!getFieldError("password")}
                            onErrorClick={() => {
                                Toast.info(getFieldError("password"), 2);
                            }}
                            type="password"
                            clear
                            placeholder="请输入密码"
                        >
                            密码
                        </InputItem>
                    </List>
                </WingBlank>
                <WhiteSpace size="xl" />
                <Flex>
                    <Flex.Item>忘记密码？</Flex.Item>
                    <Flex.Item
                        onClick={() => {
                            props.history.push("/reg");
                        }}
                    >
                        注册
                    </Flex.Item>
                </Flex>
                <WhiteSpace size="lg" />
                <Button
                    type="warning"
                    onClick={handleClick}
                >
                    登录
                </Button>
            </section>
        </>
    );
}

const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = dispatch => {
    return {

        // 测试redux_saga
        dispatch,
        login(user){
            dispatch(userAction.login(user))
        }
    }
}

Login = connect(mapStateToProps,mapDispatchToProps)(Login);

export default createForm()(Login)
