import axios from 'axios'
import {React} from 'react'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router'
import './itemDetails.css'


export const ItemDetails=({item})=>{
    const history = useHistory()
    const handleDelete = async ()=>{
        const data = await axios.delete(`https://6vy0y6749g.execute-api.eu-south-1.amazonaws.com/dev/deleteItem/${item._id}`)
        if (data.status === 200){
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
                        <Link to={`/edit/${item._id}`} type="button" class="btn btn-primary">Edit</Link>
                        <button type="button" class="btn btn-danger" onClick={handleDelete}>Delete</button>
                    </div>
            </div>
        </div>
    )
}