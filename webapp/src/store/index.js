// 1.引入
import { createStore,applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducer';
import rootSaga from './middleware/saga.js'

// 4.创建中间件
const sagaMiddleware = createSagaMiddleware();

// 2.创建仓库(创建时必须指定一个reducer)
let enhancer = applyMiddleware(sagaMiddleware);     // 连接中间件和store
const store = createStore(reducer,composeWithDevTools(enhancer));

// 5.运行自定义saga配置
sagaMiddleware.run(rootSaga)

// 3.导出
export default store;