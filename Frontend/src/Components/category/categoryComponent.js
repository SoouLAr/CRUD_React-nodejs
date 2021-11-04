import React,{useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import "../carousel/carousel.css";
import toast from "react-hot-toast";
import {ModalConfirmation} from '../modals/modalConfirmation'

export const CategoryComponent = ({ item,setDidCategoryChange,setCategoryAdded,categoryAdded}) => {
  const [modalConfimationOpen, setModalConfirmationOpen] = useState(false);

  const handleDelete = async (id)=>{
    const itemsDeletedByCategory = await axios.delete(`http://localhost:5000/item/deleteItemsByCategory/${id}`)
    if (itemsDeletedByCategory.data.status===201){
    const {status} = await axios.delete(`http://localhost:5000/category/deleteCategory/${id}`)
    if (status===200){
    toast.success("category deleted successfully!")
    setCategoryAdded(categoryAdded+1)      
    }} else {toast.error("Catgory didn't delete!")}
  }
  return (
    <div
      class="col-lg-12 col-md-4 col-sm-6 col-xs-12 mt-5"
      style={{ height: "290px" }}
    >
      <div class="hovereffect">
        <img
          class="img-responsive"
          onError={(e)=> {e.target.onError=null; e.target.src="https://bitsofco.de/content/images/2018/12/broken-1.png"}}
          width="100%"
          height="100%"
          src={`${item.images}`}
          alt=""
        />
        <div class="overlay">
          <h2>{`${item.names[0]}`}</h2>
          <Link 
          onClick={()=>{setDidCategoryChange()}} 
            class="info" to={`/category/${item._id}`}>
            link here
          </Link>
          <i  
          // onClick={()=>{handleDelete(item._id)}}
          onClick={()=>{setModalConfirmationOpen(true)}}
          class="bi bi-archive info delete-icon"></i>
        </div>
      </div>
      <ModalConfirmation
          id={item._id} 
          handleDelete={handleDelete}
          modalConfimationOpen={modalConfimationOpen}
          setModalConfirmationOpen={setModalConfirmationOpen}
        />
    </div>
  );
};
