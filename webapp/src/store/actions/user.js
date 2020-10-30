/* 1.登录 */
function login(user){
    return {
        type:'login',
        user
    }
}

/* 2.退出 */
function logout(){
    return {
        type:'logout'
    }
}

export default {
    login,
    logout
}