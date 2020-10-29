import {useState} from 'react';

export function useStorage(key,remember){
    let value
    if(remember){
        value = localStorage.getItem(key)
    }else{
        value = sessionStorage.getItem(key)
    }
    
    try{
        value = JSON.parse(value) || {}
    }catch(err){
        value = value
    }
    const [local,setLocal] = useState(value)
    const [session,setSession] = useState(value)
    
    const change = function({newValue,remember =true}){
        if(remember){
            setLocal(newValue)
        }else{
            setSession(newValue)
        }
        if(typeof newValue === 'object'){
            newValue = JSON.stringify(newValue)
        }
        remember ? localStorage.setItem(key,newValue) : sessionStorage.setItem(key,newValue)
    }
    return remember ? [local,change] : [session,change]
}

export default useStorage