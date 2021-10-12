import React from 'react'
import {Route, Redirect} from 'react-router-dom';

function PublicRoute({children,isAuth,...rest}) {
    return (
        <Route 
        {...rest}
        render = {
            ({location}) => (
                !isAuth ? (
                    children
                ) : (
                    <Redirect 
                    to={{
                        pathname: '/',
                        state: {from:location}
                    }}
                    />
                )
            )
        }

        
        />
    )
}

export default PublicRoute
