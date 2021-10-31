import axios from 'axios'
import {React} from 'react'
import { useHistory } from 'react-router'
import './itemDetails.css'

export const ItemDetails=({item})=>{
    const history = useHistory()
    const handleDelete = async ()=>{
        const {data} = await axios.delete(`http://localhost:5000/item/deleteItem/${item._id}`)
        if (data.status === 201){
            history.push("/")
        }
    }

    return (
        <div className="item-details">
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
                        <button type="button" class="btn btn-primary">Edit</button>
                        <button type="button" class="btn btn-danger" onClick={handleDelete}>Delete</button>
                    </div>
            </div>
        </div>
    )
}