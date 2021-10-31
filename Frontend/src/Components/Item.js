import axios from 'axios'
import {React, useEffect, useState} from 'react'

export const Item = ({isItemLoading,Loader,setIsloading,ItemComponent})=>{
  const [items,setItems]=useState([])
  const fetchItems=async ()=>{
      const itemsFetched = await axios.get("http://127.0.0.1:5000/item")
      setItems(...items,itemsFetched.data)
      setIsloading(false);
  }
  useEffect(()=>{
    fetchItems()
  },[])
   if (isItemLoading) {
       return (
        <div style={{ display: "flex", justifyContent: "center" }}>
               <Loader />
             </div>
       )
   } else {
       return(
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
