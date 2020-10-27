import React,{useReducer} from 'react'

const initState = {
    showLogin : false
}

const reducer = function (state,action){
    switch(action.type){
        default : 
            return state
    }
}

export const MyContext = React.createContext(null)

export const Provider = (props)=>{
    const [state,dispatch] = useReducer(reducer,initState)
    console.log(props,'5555555555555')
    return (
        <MyContext.Provider value={{state,dispatch}}>
            {props.children}
        </MyContext.Provider>
    )
}
