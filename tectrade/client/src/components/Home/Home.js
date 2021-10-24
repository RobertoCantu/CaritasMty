import React from 'react'
import Blogs from '../Blogs/Blogs'
import {useState} from 'react'

function Home() {
    const [blogs,setBlogs] = useState([{
        id: "1",
        title:"Css problems",
        author:"Danny Trejo",
        texto: "bla bla bla",
    
    }, {
        id: "2",
        title:"Javascript callback problems",
        author: "Osama Bin Laden",
        texto: "bla bla bla"
    }])
    return (
        
        <div className="home">
            <h1>My Tickets</h1>
            <Blogs blogs={blogs}/>
        </div>
    )
}

export default Home
