import axios from "axios";
import React, { useEffect, useState } from "react";
import {  useParams } from "react-router";
import {ItemComponent} from "../Components/itemCategory";

export const ItemsByCategory = ()=>{
    const {id} = useParams();
    const [items,setItems]=useState([])
    const fetchItems = async ()=>{
        const {data}=await axios.get(`http://localhost:5000/item/getItemByCategory/${id}`)
        setItems(data)
    }
    useEffect(()=>{
        fetchItems()
    },[items])
    
    return (
        <div style={{ marginTop: "30px" }}>
        <h1 className="items__header">Items</h1>
        <div className="items">
          {items.map((item) => (
            <ItemComponent key={item._id} props={item} />
          ))}
        </div>
      </div>
    )
}