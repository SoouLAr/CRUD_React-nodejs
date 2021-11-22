import axios from 'axios'
import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router'
import ReactLoading from "react-loading";
import './itemDetails.css'


export const ItemDetails=({item})=>{
    const history = useHistory()
  const [isUploading,setIsUploading] = useState(false)
    const handleDelete = async ()=>{
        setIsUploading(true)
        const data = await axios.delete(`https://6vy0y6749g.execute-api.eu-south-1.amazonaws.com/dev/deleteItem/${item._id}`)
        if (data.status === 200){
            setIsUploading(false)
            history.push("/")
        }
    }

    return (
        <div className="item-details">
            <div style={isUploading? {visibility:"visible"} : {visibility:"hidden"}} className="upper-top">
      <ReactLoading
        className="upper-top"
        type="spinningBubbles"
        color="red"
        height="150px"
        width="150px"
      /></div>
            <div className="image">
                <img height="100%" width="100%" src={item.image} alt="" />
            </div>
            <div className="details">
                    <div className="details-header">
                        <h1>{item.name}</h1>
                        <h1>{`$${item.price}`}</h1>
                        <h1>{item.unit +" left"}</h1>
                    </div>
                    <div className="buttons-actions">
                        <Link to={`/edit/${item._id}`} type="button" class="btn btn-primary">Edit</Link>
                        <button type="button" class="btn btn-danger" onClick={handleDelete}>Delete</button>
                    </div>
            </div>
        </div>
    )
}