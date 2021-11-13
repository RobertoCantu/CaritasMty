import React from 'react'
import {Route, Redirect} from 'react-router-dom';


function EmpRoute({children,isAuth, isAdmin,...rest}) {
    if(isAuth && !isAdmin)
    {
        return (
            <div>
                  <Route 
                    {...rest}
                    render = {
                        ({location}) => (children)
                    }
        />
            </div>
        )
    } else {
        return (
            <Route 
            {...rest}
            render = {
                ({location}) =>  (
                        <Redirect 
                        to={{
                            pathname: '/',
                            state: {from:location}
                        }}
                        />
                    )
                
            }
            />
        )
    }
    
}

export default EmpRoute
