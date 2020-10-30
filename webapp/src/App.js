import React, { useState, Suspense, lazy,useReducer} from 'react'
import { Tabs, WhiteSpace } from 'antd-mobile';
import { Route, Redirect, Switch, Link, NavLink, withRouter, useHistory } from 'react-router-dom';

import '@/App.scss';
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




import Nav from '@/views/Nav/Nav'
import Main from '@/views/Main/Main'
import Aidou from '@/views/Aidou/Aidou'
import Wall from '@/views/Wall/Wall'
import connect from '@/views/Avatar/Avatar'
import Emoticon from '@/views/Emoticon/Emoticon'
import Footer from '@/views/Footer/Footer'
import Detailpages from '@/views/Detailpages/Detailpages';
import Login from '@/views/Login';
import Reg from '@/views/Reg';
import Mine from '@/views/Mine';
import Modification from '@/views/Modification';

let tabs = [
  { title: "首页", query: "main", component: Main, path: '/main' ,num:'0'},
  { title: "爱豆", query: "celebrity", component: Aidou, path: '/aidou' ,num:'1'},
  { title: "壁纸", query: "wallpaper", component: Wall, path: '/wall' ,num:'2'},
  { title: "头像", query: "avatar", component: connect, path: '/avatar' ,num:'3'},
  { title: "表情", query: "emoticon", component: Emoticon, path: '/emoticon' ,num:'4'},
  { title: "影视", query: "movie_music_books", component: Main, path: '/main' },
  { title: "动漫", query: "animation", component: Main, path: '/main' },
  { title: "动图", query: "gif", component: Main, path: '/main' },
  { title: "素材", query: "material", component: Main, path: '/main' },
  { title: "萌宠", query: "moe", component: Main, path: '/main' },
  { title: "绘画", query: "painting", component: Main, path: '/main' },
  { title: "手工", query: "diy", component: Main, path: '/main' },
  { title: "穿搭", query: "fashion", component: Main, path: '/main' },
  { title: "美妆", query: "beauty", component: Main, path: '/main' },
  { title: "婚礼", query: "wedding", component: Main, path: '/main' },
  { title: "美食", query: "food", component: Main, path: '/main' },
  { title: "家居", query: "Home", component: Main, path: '/main' },
  { title: "旅行", query: "travel", component: Main, path: '/main' },
  { title: "摄影", query: "photography", component: Main, path: '/main' },
  { title: "植物", query: "plant", component: Main, path: '/main' },
  { title: "生活百科", query: "tips", component: Main, path: '/main' },
  { title: "人文艺术", query: "art", component: Main, path: '/main' },
  { title: "设计", query: "design", component: Main, path: '/main' },
  { title: "古风", query: "chinoiserie", component: Main, path: '/main' },
]
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
        {/* <div classtitle="css-o8bgc8 eas58qq0"></div> */}
        <Tabs tabs={tabs}
          initialPage={initialPage}
          animated={false}
          useOnPan={false}
          onTabClick={
            changeTabs
          }
          /* onChange={
            keepTabs
          } */
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
          <Route key='login' path='/login' component={Login}></Route>
          <Route key='reg' path='/reg' component={Reg}></Route>
          <Route key='mine' path='/mine' component={Mine}></Route>
          <Route key='modification' path='/modification' component={Modification}></Route>
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

