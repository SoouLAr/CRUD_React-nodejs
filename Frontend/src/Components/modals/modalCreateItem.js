import React, { useState } from "react";
import Modal from "react-modal";
import "./modalItem.css";


function ModalItem({
  modalIsOpen,
  closeModal,
  categories,
  addItem,
  errors,
  setErrors,
}) {
  const initialState = {
    name: "",
    price: undefined,
    unit: undefined,
    image: "",
    category: categories.length > 0 ? categories[0]._id : ""
  };

  const [state, setState] = useState(initialState);


  Modal.setAppElement("#root");
  
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

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: null,
    });
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h2 className="modal__title">Add Item</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="input_wrapper">
          <div className="input__labels">
            <p className="input_label">Name</p>
            {errors.name && <p className="span__name">Check name</p>}
          </div>
          <input
            value={state.name}
            onChange={handleChange}
            className="input"
            name="name"
          />
        </div>
        <div className="input_wrapper">
          <div className="input__labels">
            <p className="input_label">Price</p>
            {errors.price && <p className="span__name">Price larger than 0</p>}
          </div>
          <input
            type="number"
            value={state.price}
            onChange={handleChange}
            className="input"
            name="price"
          />
        </div>
        <div className="input_wrapper">
          <div className="input__labels">
            <p className="input_label">Unit</p>
            {errors.unit && <p className="span__name">Unit larger than 0</p>}
          </div>
          <input
            type="number"
            value={state.unit}
            onChange={handleChange}
            className="input"
            name="unit"
          />
        </div>
        <div className="input_wrapper">
          <div className="input__labels">
            <p className="input_label">Image</p>
            {errors.image && (
              <p className="span__name">Make sure a image url</p>
            )}
          </div>
          <input
            value={state.image}
            onChange={handleChange}
            className="input"
            name="image"
          />
        </div>
        <div className="select_input">
          <p className="input_label">Category</p>
          <select
            name="category"
            className="category__select"
            value={state.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.names}
              </option>
            ))}
          </select>
        </div>
        <div className="buttons_wrapper">
          <button
            className="modal__submit"
            onClick={() => {
              addItem(
                state.name,
                state.price,
                state.unit,
                state.image,
                state.category
              );
            }}
          >
            {" "}
            Create{" "}
          </button>
          <button
            className="modal__cancel"
            onClick={() => {
              setState(initialState);
              closeModal();
              Object.keys(errors).forEach(e => errors[e] = null)
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ModalItem;
