import React,{useLayoutEffect,useState,useContext,lazy,Suspense} from 'react';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom'
import {Col,Row} from 'antd'

// import Header from '../views/Header'
const Header = lazy(()=>import('../views/Header'))
const MainContainer  = lazy(()=>import('../views/MainContainer'))
const NavTab = lazy(()=>import('../views/NavTab'))
const User = lazy(()=>import('../views/MainContainer/user'))
const Goods = lazy(()=>import('../views/MainContainer/goods'))
const Publish = lazy(()=>import('../views/MainContainer/publish'))
const Comments = lazy(()=>import('../views/MainContainer/comments'))
const Login = lazy(()=>import('../views/Login'))
const Reg = lazy(()=>import('../views/Reg'))
const NotFound = lazy(()=>import('../views/NotFound/404'))
// import MainContainer from '../views/MainContainer'
// import NavTab from '../views/NavTab'
// import User from '../views/MainContainer/user'
// import Goods from '../views/MainContainer/goods'
// import Publish from '../views/MainContainer/publish'
// import Comments from '../views/MainContainer/comments'

// import Login from '../views/Login';
// import Reg from '../views/Reg';
// import NotFound from '../views/NotFound/404'
import {MyContext} from '../hook/index'

import './index.scss'

function RouterTable (props){
    const {state,dispatch} = useContext(MyContext)
    useLayoutEffect(()=>{
        if(state.CurrentUser.token){
            console.log('4323423')
            dispatch({type:'ShowLogin',show : false})  
        }else{
            console.log('4343rrrttttttttttttttttt')
            dispatch({type:'ShowLogin',show : true}) 
        }
    },[])
    return (
       
        <div className="Container">
            <>
            <Header showLogin={!state.showLogin}/>
            {
                   
                !state.showLogin ?    <>
                       
                        <Row className="RowWrap">
           
                                <NavTab />
                                <MainContainer>
                                    <Switch>
                                            <Route path="/mainContainer/user" component={User}/>
                                            <Route path="/mainContainer/goods" component={Goods}/>
                                            <Route path="/mainContainer/publish" component={Publish}/>
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
                :
                <>
                    <Route path="/login" component={Login} />
                    <Route path="/Reg" component={Reg} />
                    <Route path="/notfound" component={NotFound}/>
                    <Redirect from="/" to="/login" />
                </>
            }
        </>

        </div>
        
    )
}
RouterTable = withRouter(RouterTable)
export default RouterTable