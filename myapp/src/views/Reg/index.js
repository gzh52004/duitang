import React,{useContext,useCallback,} from 'react';
import {withRouter} from 'react-router-dom'
import {MyContext} from '../../hook/index'

import './index.scss';

let Reg = (props)=>{
    let {state,dispatch} = useContext(MyContext)
    const goto = useCallback(()=>{
        props.history.replace('/login')
    },[])
    return (
        <div>
            <div onClick={goto}>
                注册
            </div>
        </div>
    )
}
Reg = withRouter(Reg)
export default Reg