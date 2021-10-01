import React from 'react'
import {useState} from 'react'

function Blogs(props) {
    const {blogs} = props;
    
    return (
        <div>
            {blogs.map(blog => (
                <div className="card" style={{width: '18rem'}}>
                
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" className="btn btn-primary">Learn more</a>
                </div>
              </div>
            ))}
        </div>
    )
}

export default Blogs
