import request from '@/utils/request';

/* 1.登录 */
function login(data){
    return request.get('/user/login',{
        params:data
    })
}

/* 2.注册 */
function reg(data){
    return request.post('user/reg',data)
}

export default {
    reg,
    login
}
