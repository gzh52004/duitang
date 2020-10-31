import React, { useState, Suspense, lazy,useReducer} from 'react'
import { Tabs, WhiteSpace } from 'antd-mobile';
import { Route, Redirect, Switch, Link, NavLink, withRouter, useHistory, Router } from 'react-router-dom';
import {tabs,routes} from'@/router/index.js'
import '@/App.scss';
import Nav from '@/views/Nav/Nav'
import Footer from '@/views/Footer/Footer'
import Detailpages from '@/views/Detailpages/Detailpages';

// const Nav = lazy(() => import("@/views/Nav/Nav"));
// const Main = lazy(() => import("@/views/Main/Main"));
// const Aidou = lazy(() => import("@/views/Aidou/Aidou"));
// const Wall = lazy(() => import("@/views/Wall/Wall"));
// const connect = lazy(() => import("@/views/Avatar/Avatar"));
// const Emoticon = lazy(() => import("@/views/Emoticon/Emoticon"));
// const Footer = lazy(() => import("@/views/Footer/Footer"));
// const Login = lazy(() => import("@/views/Login"));
// const Reg = lazy(() => import("@/views/Reg"));
// const Mine = lazy(() => import("@/views/Mine"));
// const Modification = lazy(() => import("@/views/Modification"));
const initState={
  initialPage:0
}
// 纯函数
// const reducer=function(state,action){
//   switch(action.type){
//     case 'keep_tabs':
//       return{
//         initialPage:action.index
//       }
//   }
// }
let App = function (props) {
  console.log('appProps', props);
  // const [state,dispatch]=useReducer(reducer,initState)
  useState(tabs)
  const [initialPage,saveTabs]=useState(0)
  // 路由跳转
  let history = useHistory();
  // console.log(history);
  let changeTabs = (tab, index) => {
    // console.log(tab);
    // console.log(index);
    // console.log('点击切换');
    // dispatch({type:'keep_tabs',index})
    // console.log(state.initialPage);
    history.push(tab.path)
  }
  // console.log(state.initialPage);
  /* let keepTabs=(tab,index)=>{
    console.log(tab);
    console.log('initialPage修改前',initialPage);
    saveTabs(index)
    console.log(index);
  } */
  // console.log('initialPage修改后',initialPage);
  return (
    <div className="App" style={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ position: 'fixed', top: 0, zIndex: 999 }}>
        <Nav style={{ position: 'fixed', boxSizing: 'border-box' }} />
        <WhiteSpace style={{ position: 'fixed' }} />
        <Tabs tabs={tabs}
          // initialPage={initialPage}
          animated={false}
          useOnPan={false}
          onTabClick={
            changeTabs
          }
          style={{
            overflow: 'hidden',
          }}
        >
          {
            // console.log(tabs),
            // 循环点击每个不同tab显示显示的内容div
            /* tabs.map(item =>
              <div style={{ display: 'flex', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }} key={item.query}>
                {item.title}
              </div>) */
          }
        </Tabs>
        <WhiteSpace />
      </div>
      <div style={{/*  height: '1000px',  */marginTop: '97px' }}>
      {/* <Suspense fallback={<div>loading...</div>}> */}
        <Switch >
          {
            tabs.map(item => <Route key={item.query} path={item.path} component={item.component} />)
          }
          {
            routes.map(item=><Route key={item.query} path={item.path} component={item.component} />)
          }
          <Route key='detailpages' path='/detailpages/:id' component={Detailpages}></Route>
          <Route path='/notfound' render={() => <div>404</div>} />
          <Redirect from='/' to='/main' exact />
          <Redirect to='/notfound' />
        </Switch>
        {/* </Suspense> */}
      </div>

      <Footer></Footer>

    </div>
  );
}

export default App;

