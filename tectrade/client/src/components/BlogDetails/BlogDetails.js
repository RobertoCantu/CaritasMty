import React from 'react'
import { useParams } from 'react-router'

function BlogDetails() {
   const {id} = useParams ();
    return (
        <div>
            {id}
        </div>
    )
}

export default BlogDetails
