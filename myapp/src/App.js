import React,{Suspense} from 'react'
// ui框架直接引用要用的组件
// import { Menu, Col, Row, Button } from 'antd';
// 样式
import { Spin, Alert } from 'antd';
import '@/App.scss';
// import RouterTable from './Router'
const RouterTable = React.lazy(()=>import('./Router'));
import {Provider} from './hook/index';

// 路由跳转
// import { Route, Redirect, Switch, NavLink, withRouter } from "react-router-dom"
function App() {
  return (
    <div className="App">
      <Provider>
        <Suspense fallback={ <Spin className="Loading" size="large" tip="Loading..."></Spin>}>
          <RouterTable/>
        </Suspense>
      </Provider>
    </div>
  );
}

export default App;
