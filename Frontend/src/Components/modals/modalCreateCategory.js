import React, { useState } from "react";
import Modal from "react-modal";
import axios from 'axios'
import update from 'react-addons-update';
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
export const ModalCategory = ({ modalCategoryOpen, closeModal,categoryAdded,setCategoryAdded }) => {
  Modal.setAppElement("#root");
  const history = useHistory();
  const [name,setName]=useState('')
  const [category, setCategory] = useState({
    names: [""],
    images: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category.names === "" && category.images === "") {
      toast.error("Please complete the form");
      return 0;
    }
    if (/^[^a-zA-Z]+$/.test(category.names[0])) {
      console.log("Here");
      return 0;
    }
    category.names[0]=name;
    const { status } = await axios.post(
      "http://localhost:5000/category/addCategory",
      category
    );
    if (status === 200) {
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
              value={name}
              onChange={(e) => {setName(e.target.value)}}
              type="text"
              class="form-control"
            />
          </div>
          <div class="form-group col-md-12">
            <label for="inputPassword4">Image (URL)</label>
            <input
              onChange={(e)=>{setCategory({...category,images:e.target.value})}}
              name="images"
              value={category.images}
              type="url"
              class="form-control"
            />
          </div>
        </div>
        <button type="submit" class="btn btn-success">
          Create
        </button>
      </form>
    </Modal>
  );
};
