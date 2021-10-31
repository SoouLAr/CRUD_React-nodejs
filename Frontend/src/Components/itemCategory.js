import React from "react";
import { Link } from "react-router-dom";
export const ItemComponent = ({props})=>{
    return (
        <Link to={"/items/"+props._id}className="item">
            <img src={props.image} alt="" style={{zIndex:"-5",height:"100%",width:"100%",opacity:"20%",display:"inline-block"}} />
            <div className="image__header item_header">
                <h1 className="">{props.name}</h1>
                <p className="item__price">{props.price} All</p>
            </div>
        </Link>
    )
}
