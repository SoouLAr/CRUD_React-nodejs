import React from "react";
import {Link} from 'react-router-dom'
import './carousel.css'

export const CategoryComponent = (props)=>{
    return(
        <Link to={`/category/${props._id}`} className="nested" style={{backgroundImage:"linear-gradient(90deg, rgba(106,102,184,1) 0%, rgba(0,212,255,0.5592437658657212) 100%)"}}>
            <img className="imageCategory" src={props.images} alt="" style={{zIndex:"-5",height:"280px",width:"640px",opacity:"40%",display:"inline-block"}} />
            <h1 className="image__header">{props.names}</h1>
        </Link>
    )
}
