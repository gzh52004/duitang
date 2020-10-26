
import React from 'react'
import {Route,Switch,withRouter} from 'react-router-dom'



function MainContainer (props){
    return(
        <div>
            {props.children}
        </div>
    )
}

MainContainer = withRouter(MainContainer)

export default MainContainer