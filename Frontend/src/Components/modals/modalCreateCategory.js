import React, { useState } from "react";
import Modal from "react-modal";
import axios from 'axios'
import { toast } from "react-hot-toast";
import {useHistory} from 'react-router-dom'
import "./modalItem.css";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    padding: "20px 50px",
    backgroundColor: "white",
    borderRadius: 10,
  },
};
const initialState={
  names: '',
  image: {},
}
export const ModalCategory = ({ modalCategoryOpen, closeModal,categoryAdded,setCategoryAdded }) => {
  Modal.setAppElement("#root");
  const history = useHistory();
  const [category, setCategory] = useState(initialState);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.append('image', category.image);
    bodyFormData.set('names',[category.names.toUpperCase()])
    if (category.names === "" || category.image.size === undefined) {
      toast.error("Please complete the form");
      return 0;
    }
    if (/[^a-zA-Z]/.test(category.names[0])){
          toast.error("Name should not contain numbers or symbol")
          return 0;
    }
    const response = await axios.post(
      "http://localhost:5000/category/addCategory",
      bodyFormData
    );
    if (response.status === 200) {
      setCategory(initialState)
      toast.success("Added successfully");
      closeModal();
      history.push("/");
      setCategoryAdded(categoryAdded+1)
    }
  };

  return (
    <Modal
      isOpen={modalCategoryOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <form onSubmit={handleSubmit}>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputEmail4">Name</label>
            <input
              name="names"
              value={category.names}
              onChange={(e) => {setCategory({...category,names:e.target.value})}}
              type="text"
              class="form-control"
            />
          </div>
          <div class="form-group  col-md-12">
            <label>Image</label>
            <input
              onChange={(e)=>{setCategory({...category,image:e.target.files[0]})}}
              name="images"
              value={category.images}
              type="file"
              class="form-control pointer"
            />
          </div>
        </div>
        <div className="row justify-content-between col-md-5">
        <button type="submit" class="btn btn-success">
          Create
        </button>
        <button 
        className="btn btn-danger align-self-end"
        onClick={()=>{closeModal()}}
        >
          Close
        </button>
        </div>
      </form>
    </Modal>
  );
};
