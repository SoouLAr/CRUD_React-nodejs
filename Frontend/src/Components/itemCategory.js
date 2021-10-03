import React from "react";

const Item = ({props})=>{
    return (
        <div className="item">
            <img src={props.image} alt="" style={{zIndex:"-5",height:"100%",width:"100%",opacity:"20%",display:"inline-block"}} />
            <div className="image__header item_header">
                <h1 className="">{props.name}</h1>
                <p className="item__price">{props.price} All</p>
            </div>
        </div>
    )
}

export default Item;