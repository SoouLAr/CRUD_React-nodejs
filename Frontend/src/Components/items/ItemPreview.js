import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ItemDetails } from "../item-details/itemDetails";

export const ItemPreview = ()=>{
    const {_id} = useParams();
    const [item,setItem]=useState({})
    const fetchItem = async ()=>{
        try{
        const {data} = await axios.get(`http://localhost:5000/item/getItem/${_id}`)
        setItem(data)
    }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchItem()
        // eslint-disable-next-line
    },[_id])
    return(
        <ItemDetails item={item} />
    )
}