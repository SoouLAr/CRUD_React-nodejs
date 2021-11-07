import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import {toast} from 'react-hot-toast'
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

export const ModalItem = ({modalIsOpen,closeModal,categories}) => {
  Modal.setAppElement("#root");
  const history=useHistory();
  const initialState = {
    name: "",
    price: undefined,
    unit: undefined,
    image: "",
    category: ''
  };

  const [state, setState] = useState(initialState);

  const handleChange = (e) => {setState({...state,[e.target.name]: e.target.value,});};

  const handleSubmit = async(e)=>{
      e.preventDefault();
      var bodyFormData = new FormData();
      bodyFormData.append('image', state.image);
      bodyFormData.set("name",state.name)
      bodyFormData.set("price",state.price)
      bodyFormData.set("unit",state.unit)
      bodyFormData.set("category",state.category)
      const {data} = await axios.post("http://localhost:5000/item/addItem/",bodyFormData)
      if (data.status===201) {
        toast.success("Item added succsesfully")
        closeModal()
        history.push('/')
      }
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <form onSubmit={handleSubmit}>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputEmail4">Name</label>
            <input
              name="name"
              onChange={handleChange}
              type="text"
              class="form-control"
              id="inputEmail4"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="inputAddress">Image</label>
          <input
            name="image"
            onChange={e=>setState({...state,image:e.target.files[0]})}
            type="file"
            class="form-control"
            id="inputAddress"
          />
        </div>
        <div class="form-row">
          <div class="form-group col-md-5">
            <label for="inputCity">Price</label>
            <input
              name="price"
              onChange={handleChange}
              type="number"
              class="form-control"
              id="inputCity"
            />
          </div>
          <div class="form-group col-md-5">
            <label for="inputCity">Unit</label>
            <input
              name="unit"
              onChange={handleChange}
              type="number"
              class="form-control"
              id="inputCity"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputState">Category</label>
            <select
              name="category"
              onChange={handleChange}
              id="inputState"
              class="form-control"
            >
              {categories.map((category, index) => {
                return <option  value={category._id} key={index}>{category.names[0]}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="row justify-content-between col-md-5">
        <button type="submit" class="btn btn-success">
          Submit
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
