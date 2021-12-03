import React,{useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import "../carousel/carousel.css";
import toast from "react-hot-toast";
import {ModalConfirmation} from '../modals/modalConfirmation'
import ReactLoading from "react-loading";


export const CategoryComponent = ({ item,setDidCategoryChange,setCategoryAdded,categoryAdded,setIsDeleted}) => {
  const [modalConfimationOpen, setModalConfirmationOpen] = useState(false);

  const handleDelete = async (id)=>{
    try {
      setIsDeleted(true)
    const {status} = await axios.delete(`https://whror49dn5.execute-api.eu-south-1.amazonaws.com/dev/category/deleteCategory/${id}`,{headers:{"Authorization":localStorage.getItem('idToken')}})
    if (status===200){
      setIsDeleted(false)
      toast.success("category deleted successfully!")
      setCategoryAdded(categoryAdded+1)}
    } catch (error) { 
      toast.error("Catgory didn't delete!")
    }
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
          src={`${item.image}`}
          alt=""
        />
        <div class="overlay">
          <h2>{`${item.name}`}</h2>
          <Link 
          onClick={()=>{setDidCategoryChange()}} 
            class="info" to={`/category/${item._id}`}>
            link here
          </Link>
          {localStorage.getItem("idToken") && <i  
          // onClick={()=>{handleDelete(item._id)}}
          onClick={()=>{setModalConfirmationOpen(true)}}
          class="bi bi-archive info delete-icon"></i>}
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
