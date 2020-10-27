import React,{useReducer} from 'react'

const initState = {
    showLogin : false
}

const reducer = function (state,action){
    console.log(state,action,'reducer2222')
    switch(action.type){
        case 'ShowLogin' :
            return {
                showLogin : action.show
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
