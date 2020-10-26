import React, { useState } from 'react'
import { Tabs, WhiteSpace } from 'antd-mobile';
import { Route, Redirect, Switch, Link, NavLink, withRouter,useHistory } from 'react-router-dom';

import '@/App.scss';
import Nav from '@/views/Nav/Nav'
import Main from '@/views/Main/Main'
import Aidou from '@/views/Aidou/Aidou'
import Wall from '@/views/Wall/Wall'
import Avatar from '@/views/Avatar/Avatar'
import Emoticon from '@/views/Emoticon/Emoticon'
let tabs = [
  { title: "首页", query: "main", component: Main, path: '/main' },
  { title: "爱豆", query: "celebrity", component: Aidou, path: '/aidou' },
  { title: "壁纸", query: "wallpaper", component: Wall, path: '/wall' },
  { title: "头像", query: "avatar", component: Avatar, path: '/avatar' },
  { title: "表情", query: "emoticon", component: Emoticon, path: '/emoticon' },
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
let App = function (props) {
  console.log('appProps', props);

  useState(tabs)
  /* const changeTabs = () => {
    const history = useHistory();
    handleClick()
    const handleClick = (tab, index) => {
      console.log(tab.path);
      console.log(index);
      console.log('点击切换');
      console.log(history);
      history.push("tab.path");
    }
  } */
  let history = useHistory(); 
  console.log(history);
  let changeTabs=(tab,index)=>{
      console.log(tab);
      console.log(index);
      console.log('点击切换');
      history.push(tab.path)
  }
  return (
    <div className="App">
      <Nav />
      <WhiteSpace />
      {/* <div classtitle="css-o8bgc8 eas58qq0"></div> */}
      <Tabs tabs={tabs}
        initialPage={2}
        animated={false}
        useOnPan={false}
        onTabClick={changeTabs}
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
      <Switch>
        {
          tabs.map(item => <Route key={item.query} path={item.path} component={item.component} />)
        }
      </Switch>
    </div>
  );
}

export default App;
