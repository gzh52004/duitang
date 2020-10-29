import React,{useReducer} from 'react'

let showLogin = JSON.parse(localStorage.getItem('showLogin'))
let CurrentUser = localStorage.getItem('CurrentUser') || sessionStorage.getItem('CurrentUser')
try{
    CurrentUser = JSON.parse(CurrentUser) || {}
}catch(err){
    CurrentUser = {}
}

console.log(showLogin,'00000000000000000000000000000033')
const initState = {
    showLogin : showLogin || false,
    CurrentUser,
}

const reducer = function (state,action){
    switch(action.type){
        case 'ShowLogin' :
            localStorage.setItem('showLogin',JSON.stringify(action.show))
            return {
                ...state,
                showLogin : action.show
            }
        case 'Login' :
            let data = JSON.stringify(action.data)
            action.remember ?  localStorage.setItem('CurrentUser',data) : sessionStorage.setItem('CurrentUser',data)
            return {
                ...state,
                CurrentUser : action.data
            }
        case 'Quit' :
            localStorage.removeItem('CurrentUser')
            sessionStorage.removeItem('CurrentUser')
            return {
                ...state,
                showLogin:action.show
            }
    }
    return state
}

export const MyContext = React.createContext(null)

export const Provider = (props)=>{
    const [state,dispatch] = useReducer(reducer,initState)
    return (
        <MyContext.Provider value={{state,dispatch}}>
            {props.children}
        </MyContext.Provider>
    )
}
