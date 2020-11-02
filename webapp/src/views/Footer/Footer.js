import React from 'react'

// import { Button } from 'antd-mobile';

import '@/views/Footer/index.scss'
import But from './Button.js'
// import { Button } from 'antd-mobile'
// import Login from '@/views/Login/index.jsx'
// import Reg from '@/views/Reg/index.jsx'
// import { Router,useHistory } from 'react-router-dom';

// let routes = [
//     { title: "登录", query: "login", component: Login, path: '/login' },
//     { title: "注册", query: "reg", component: Reg, path: '/reg' }
// ,]
const Footer = function (props) {
    /* let history = useHistory();
      let changeTabs = (routers) => {
          console.log(routers);
          if(routers.title=="登录"){
            history.push(routers.path)
          }else{
            history.push(routers.path)
          }
        
      } */
    return (
        <div className='footer' >
            <div>
                <img  src={require('./../../assets/images/daz.jpeg')}></img>

                <div className='fontbox' ><div>有什么美得不可方物的</div><div>神仙壁纸？</div>
                </div>
                {/* <div style={{ height: '46px', display: 'flex', float: 'right', boxSizing: 'border-box', alignItems: 'center', flexDirection: 'row' }}>
                    <Button type="primary" size='small' inline style={{ width: "60px", borderRadius: '10px' }} onClick={
                        () => {
                            changeTabs(routes[0])
                        }
                    }>登录</Button>

                    <Button type="warning" size='small' inline style={{ width: "60px", borderRadius: '10px' }} onClick={
                        () => {
                            changeTabs(routes[1])
                        }
                    }>注册</Button>
                </div> */}
                <But></But>
            </div>
        </div>
    )
}
// Footer = withRouter(Footer)
export default Footer



