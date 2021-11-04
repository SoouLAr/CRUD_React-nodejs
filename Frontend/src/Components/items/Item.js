import axios from 'axios'
import {React, useEffect, useState} from 'react'

export const Item = ({ItemComponent})=>{
  const [items,setItems]=useState([])
  const fetchItems= async ()=>{
      const {data} = await axios.get("http://127.0.0.1:5000/item")
      setItems(...items,data);
  }
  useEffect(()=>{
    fetchItems()
  },[])
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
