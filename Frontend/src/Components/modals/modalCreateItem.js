import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import ReactLoading from "react-loading";


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
export const initialErrors = {
  name: undefined,
  image: undefined,
  price: undefined,
  unit: undefined,
  category: undefined,
};

export const ModalItem = ({ modalIsOpen, closeModal, categories, isItemAdded,setisItemAdded }) => {
  Modal.setAppElement("#root");
  const history = useHistory();
  const initialState = {
    name: "",
    price: undefined,
    unit: undefined,
    image: "",
    category: "",
  };
  const initialErrors = {
    name: undefined,
    image: undefined,
    price: undefined,
    unit: undefined,
    category: undefined,
  };
  const [url, setUrl] = useState("");
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [isUploading,setIsUploading] = useState(false)

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        // Checks if the name will be empty and place it
        if (e.target.value === "") {
          setState({ ...state, name: e.target.value });
          setErrors({ ...errors, name: false });
          break;
        }
        // Check if the name contains symbols or numbers
        if (/^[A-Za-z]+$/.test(e.target.value)) {
          setState({ ...state, name: e.target.value });
          e.target.value !== ""
            ? setErrors({ ...errors, name: false })
            : setErrors({ ...errors, name: true });
        } else {
          setState({ ...state, name: e.target.value });
          setErrors({ ...errors, name: true });
        }
        break;
        case "unit":
          if(e.target.value===""){
            setErrors({...errors,unit:false})
            break;
          }
          if (/^[1-90]+$/.test(e.target.value)){
            setState({...state,unit:e.target.value})
            setErrors({...errors,unit: false})
          } else {
            setErrors({...errors,unit:true})
            setState({...state,unit:e.target.value})
          }
        break;
        case "price":
          if(e.target.value===""){
            setErrors({...errors,price:false})
            break;
          }
          if (/^[1-90]+$/.test(e.target.value)){
            setState({...state,price:e.target.value})
            setErrors({...errors,price: false})
          } else {
            setErrors({...errors,price:true})
            setState({...state,price:e.target.value})
          }
        break;
        case "category":
          setState({...state,category:e.target.value})
        break;
    }
  };

  const handleImage = async (e) => {
    if (e.target.files[0].type.startsWith("image/")) {
      setState({ ...state, image: e.target.files[0]});
      setErrors({ ...errors, image: false });
      const { data } = await axios.get(
        `https://w3mjpdk90m.execute-api.eu-south-1.amazonaws.com/dev/getUploadUrl/${
          e.target.files[0].name.split(".")[1]
        }`
      );
      setUrl(data.link);
    } else {
      setErrors({ ...errors, image: true });
      e.target.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true)
    const response = await axios.put(url, state.image, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    try {
      const data = await axios.post(
        `https://8juechbwt9.execute-api.eu-south-1.amazonaws.com/dev/addItem/${
          state.name
        }/${state.price}/${state.unit}/${state.category}?url=${url.split('?')[0]}`,null,{headers:{"Access-Control-Allow-Origin":'*',"Authorization":localStorage.getItem('idToken')}}
      );
      if (data.status === 201) {
        setIsUploading(false)
        toast.success("Item added succsesfully");
        closeModal();
        setisItemAdded(!isItemAdded)
      }
    } catch (error) {
        toast.error("Item didn't get added")
    }
    
  };  

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
            <div style={isUploading? {visibility:"visible"} : {visibility:"hidden"}} className="upper-top">
      <ReactLoading
        className="loader"
        type="spinningBubbles"
        color="red"
        height="150px"
        width="150px"
      /></div>
      <form onSubmit={handleSubmit}>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputEmail4">Name</label>
            <label
              style={
                errors.name === true
                  ? { visibility: "visible", fontSize: "14px" }
                  : { visibility: "hidden" }
              }
              className="ml-3 text-danger"
            >
              Must contain only characters
            </label>
            <input
              style={
                errors.name === true
                  ? {
                      border: "solid 1px red",
                      boxShadow: "0 0 0 .2rem rgba(255,0,0,.25)",
                    }
                  : {}
              }
              name="name"
              onChange={handleChange}
              type="text"
              class="form-control"
              id="inputEmail4"
              value={state.name}
            />
          </div>
        </div>
        <div class="form-group">
          <label for="inputAddress">Image</label>
          <label
            style={
              errors.image === true
                ? { visibility: "visible", fontSize: "14px" }
                : { visibility: "hidden" }
            }
            className="ml-3 text-danger"
          >
            Make sure the document is an image!
          </label>
          <input
            accept="image/*"
            name="image"
            onChange={handleImage}
            type="file"
            class="form-control"
            id="inputAddress"
            style={
              errors.image === true
                ? {
                    border: "solid 1px red",
                    boxShadow: "0 0 0 .2rem rgba(255,0,0,.25)",
                  }
                : {}
            }
          />
        </div>
        <div class="form-row">
          <div class="form-group col-md-5">
            <label for="inputCity">Price</label>
            <label
              style={
                errors.price === true
                  ? { visibility: "visible", fontSize: "14px" }
                  : { visibility: "hidden" }
              }
              className="ml-3 text-danger"
            >
              Must be a number
            </label>
            <input
              name="price"
              onChange={handleChange}
              type="text"
              class="form-control"
              id="inputCity"
              style={
                errors.price === true
                  ? {
                      border: "solid 1px red",
                      boxShadow: "0 0 0 .2rem rgba(255,0,0,.25)",
                    }
                  : {}
              }
            />
          </div>
          <div class="form-group col-md-5">
            <label for="inputCity">Unit</label>
            <label
              style={
                errors.unit === true
                  ? { visibility: "visible", fontSize: "14px" }
                  : { visibility: "hidden" }
              }
              className="ml-3 text-danger"
            >
              Must be a number
            </label>
            <input
              name="unit"
              onChange={handleChange}
              type="text"
              class="form-control"
              id="inputCity"
              style={
                errors.unit === true
                  ? {
                      border: "solid 1px red",
                      boxShadow: "0 0 0 .2rem rgba(255,0,0,.25)",
                    }
                  : {}
              }
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
                return (
                  <option value={category._id} key={index}>
                    {category.name}
                  </option>
                );
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
            onClick={() => {
              closeModal();
            }}
          >
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};
