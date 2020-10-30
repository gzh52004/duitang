let userInfo = localStorage.getItem('userInfo');
let isLogin = false;

try{
    userInfo = JSON.parse(userInfo) || {}
}catch(err){
    userInfo = {}
}
if(userInfo.token){
    isLogin = true;
}

// 4.定义reducer
const initState = {
    userInfo,
    isLogin
}
const userReducer = function(state=initState,action){
    switch(action.type){
        /* 登录 */
        case 'login':
            localStorage.setItem('userInfo',JSON.stringify(action.user))
            return {
                userInfo:action.user,
                isLogin:true
            }
        /* 登出 */
        case 'logout':
            localStorage.removeItem('userInfo');
            window.location.hash = '/login'
            return {
                userInfo:{},
                isLogin:false
            }
        /* 更新用户信息 */
        case 'user_update':
            const newState = {
                ...state,
                userInfo:{
                    ...state.userInfo,
                    ...action.user
                }
            }
            /* 数据更新重新存储 */
            localStorage.setItem('userInfo',JSON.stringify(newState))
            return newState
        /* 都不符合时，返回当前state */
        default:
            return state
    }
}

export default userReducer;