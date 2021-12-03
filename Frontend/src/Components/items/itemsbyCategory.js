import axios from "axios";
import React, { useEffect, useState } from "react";
import {  useParams } from "react-router";
import {ItemComponent} from "../item-wrapper/itemCategory";
import ReactLoading from "react-loading";


export const ItemsByCategory = ({didCategoryChange})=>{
    const {id} = useParams();
    const [items,setItems]=useState([])
  const [isLoading,setIsLoading]=useState(true)

    const fetchItems = async ()=>{
      setIsLoading(true)
        const {data}=await axios.get(`https://whror49dn5.execute-api.eu-south-1.amazonaws.com/dev/items/getItemsByCategory/${id}`)
        setItems(data.body)
        setIsLoading(false)
    }
    useEffect(()=>{
        fetchItems()
        // eslint-disable-next-line
    },[didCategoryChange])
    if (isLoading===true){
      return (
        <ReactLoading
        className="loader"
        type="spinningBubbles"
        color="red"
        height="150px"
        width="150px"
      />
      )
    } else {
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
}