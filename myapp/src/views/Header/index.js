// 路由跳转
import { Route, Switch,withRouter} from "react-router-dom"
import { Menu, Col, Row, Button } from 'antd';
import Login from '../Login'
import Reg from '../Reg'
import Log from '@/assets/img/log.png'
import './index.scss'
// 样式
import 'antd/dist/antd.css';
import React from 'react';


class Header extends React.Component {
//登录
goto = path => {
    this.props.history.push(path)
    console.log( this.props.history.push(path),555);
    
}
render(){
  
    return(
        <div>
        <Row>
        <Col span={18} >
            <Menu theme='dark' mode='horizontal' style={{background:'#999'}}>
              <div className="logo">
            <div><img src={Log}alt=""/></div>
            <h2>后台管理系统</h2>
              </div>
            </Menu>
        </Col>
        <Col span={6} style={{ background: '#999', lineHeight: '46px', textAlign: 'right' }}>

            {
            //    isLogin ?
            //    <Button type="link" onClick={()=>{logout()}}>退出</Button>
            //     :
                <><Button type="link" onClick={this.goto.bind(false, '/login')}>登录</Button>
                <Button type="link" onClick={this.goto.bind(false, '/reg')}>注册</Button> </>}

        </Col>
    </Row>

    <Switch>
    <Route path="/login" component={Login} />
    <Route path="/reg" component={Reg} />
    </Switch>
    </div>

    )


}

}
Header = withRouter(Header)
export default Header
