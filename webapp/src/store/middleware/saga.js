import userApi from '@/api/user'
/* 1.引入 */
import { call,put,takeEvery } from 'redux-saga/effects'  // 不可控的操作都在该模块里控制

/* 2.初始化 */
function * inital(){
    console.log('saga.inital：开始调用异步action，准备执行生成器函数login');
    // 2.1 定义/监听异步action，即saga action，当异步action被触发时，执行指定的生成器函数login
    yield takeEvery('login_async',login)
}

/* 3.登录_生成器函数 */
function * login(sagaAction,props){

    let search = window.location.hash;
    const pathname = search.match(/targetUrl\=([\/\w\-]+)/);
    /* 设置变量 */
    let targetUlr;
    /* 临界值判断 */
    if(pathname){
        targetUlr = pathname[1]
    }

    console.log('targetUlr',targetUlr);

    console.log('接收参数sagaAction=',sagaAction);

    console.log('saga.login：执行login生成器函数');

    // 3.5 saga的参数接收
    const {data} = yield call(
        userApi.login,
        sagaAction.data
    )
    // 等待ajax请求得到数据后，才会返回合适的next

    console.log('data=',data);

    if(data.code == 1){
        /* 如果有targetUrl则跳转到指定路径，否则跳转回mine */
        window.location.hash = targetUlr || '/mine'
    }else{
        console.log('帐密错误');
        return
    }

    // 4.等待异步结果返回后，调用同步action
    const action = {
        type:'login',
        user:data.data
    }
    // 4.1 通过redux-saga获取dispatch，即put
    yield put(action);
}

export default inital;