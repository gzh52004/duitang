import React,{useEffect,useState,useContext} from 'react';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom'
import {Col,Row} from 'antd'

import Header from '../views/Header'

import MainContainer from '../views/MainContainer'
import NavTab from '../views/NavTab'
import User from '../views/MainContainer/user'
import Goods from '../views/MainContainer/goods'
import Orders from '../views/MainContainer/orders'
import Comments from '../views/MainContainer/comments'

import Login from '../views/Login';
import Reg from '../views/Reg';
import NotFound from '../views/NotFound/404'

import {MyContext} from '../hook/index'

function RouterTable (props){
    // const {state,dispatch} = useContext(MyContext)
    // console.log(state,'666666666')
    // let [ShowLogin,changeShowLogin] = useState(false)
    return (
        <>
        {/* {
            !ShowLogin ? 
           <> */}
             <Header />
            <Row>
                <NavTab />
                <MainContainer>
                        <Switch>
                            <Route path="/mainContainer/user" component={User}/>
                            <Route path="/mainContainer/goods" component={Goods}/>
                            <Route path="/mainContainer/orders" component={Orders}/>
                            <Route path="/mainContainer/comments" component={Comments}/>
                            <Route path="/notfound" component={NotFound}/>
                            <Redirect from="/mainContainer" to="mainContainer/user" exact/>
                            <Redirect path="/mainContainer" to="/notfound" />
                        </Switch>
                </MainContainer>
            </Row>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/Reg" component={Reg} />
            <Route path="/mainContainer" component={MainContainer} />
            <Route path="/notfound" component={NotFound}/>
            <Redirect from="/" to="mainContainer/user" exact/>
            <Redirect to="/notfound"/>
        </Switch> 
           </>
        // :
        // <>
        // <Switch>
        //     <Route path="/login" component={Login} />
        //     <Route path="/Reg" component={Reg} />
        // </Switch>
        // </>
        // }
      
    )
}
RouterTable = withRouter(RouterTable)
export default RouterTable