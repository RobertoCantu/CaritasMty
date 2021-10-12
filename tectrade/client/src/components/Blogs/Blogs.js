import React from 'react'
import {useState} from 'react'
import { Link } from 'react-router-dom';

function Blogs(props) {
    const {blogs} = props;
    
    return (
        <div>
            {blogs.map(blog => (
                <div key={blog.id} className="card" style={{width: '18rem'}}>
                
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <Link to={`Blogs/${blog.id}`} className="btn btn-primary">Learn more</Link>
                </div>
              </div>
            ))}
        </div>
    )
}

export default Blogs
