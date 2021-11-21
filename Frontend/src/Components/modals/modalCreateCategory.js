import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
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
const initialState = {
  names: "",
  image: "",
};
const initialErrors = {
  names: undefined,
  images: undefined,
};
export const ModalCategory = ({
  modalCategoryOpen,
  closeModal,
  categoryAdded,
  setCategoryAdded,
}) => {
  Modal.setAppElement("#root");
  const history = useHistory();
  const [category, setCategory] = useState(initialState);
  const [postUrl, setPostUrl] = useState("");
  const [errors, setErrors] = useState(initialErrors);

  const handleChange = async (e) => {
    if (e.target.files[0].type.startsWith("image/")) {
      setCategory({ ...category, image: e.target.files[0] });
      const { data } = await axios.get(
        `https://w3mjpdk90m.execute-api.eu-south-1.amazonaws.com/dev/getUploadUrl/${
          e.target.files[0].name.split(".")[1]
        }`
      );
      setPostUrl(data.link);
      setErrors({ ...errors, images: false });
    } else {
      setErrors({ ...errors, images: true });
      e.target.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.names === false && errors.images === false) {
      await axios.put(postUrl, category.image, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = await axios.post(
        `https://h05yrcqc6a.execute-api.eu-south-1.amazonaws.com/dev/addCategory/${
          category.names
        }?url=${postUrl.split("?")[0]}`
      );
      if (data.status === 201) {
        setCategory(initialState);
        toast.success("Added successfully");
        closeModal();
        history.push("/");
        setCategoryAdded(categoryAdded + 1);
        setErrors(initialErrors);
      }
    } else {
      toast.error("Please complete the form correctly");
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
            <label
              style={
                errors.names === true
                  ? { visibility: "visible", fontSize: "14px" }
                  : { visibility: "hidden" }
              }
              className="ml-3 text-danger "
            >
              Name must contains only characters
            </label>
            <input
              name="names"
              value={category.names}
              onChange={(e) => {
                if (e.target.value === "")
                  setCategory({ ...category, names: e.target.value });
                if (/^[A-Za-z]+$/.test(e.target.value)) {
                  setCategory({ ...category, names: e.target.value });
                  e.target.value !== ""
                    ? setErrors({ ...errors, names: false })
                    : setErrors({ ...errors, names: true });
                } else {
                  setErrors({ ...errors, names: true });
                  setCategory({ ...category, names: e.target.value });
                }
              }}
              type="text"
              class="form-control"
              style={
                errors.names === true
                  ? {
                      border: "solid 1px red",
                      boxShadow: "0 0 0 .2rem rgba(255,0,0,.25)",
                    }
                  : {}
              }
            />
          </div>
          <div class="form-group  col-md-12">
            <label>Image</label>
            <label
              style={
                errors.images === true
                  ? { visibility: "visible", fontSize: "14px" }
                  : { visibility: "hidden" }
              }
              className="ml-3 text-danger"
            >
              Make sure the document is an image!
            </label>
            <input
              accept="image/*"
              onChange={handleChange}
              name="images"
              value={category.images}
              type="file"
              class="form-control pointer"
              style={errors.images === true ? { border: "solid 1px red",boxShadow: "0 0 0 .2rem rgba(255,0,0,.25)"} : {}}
            />
          </div>
        </div>
        <div className="row justify-content-between col-md-5">
          <button type="submit" class="btn btn-success">
            Create
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
