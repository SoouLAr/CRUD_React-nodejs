import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-hot-toast";
import ReactLoading from "react-loading";
import "../edit-item/EditItem.css";

const initialErrors = {
  name: false,
  unit: false,
  price: false,
};

export const EditItem = ({ categories }) => {
  const { id } = useParams();
  const history = useHistory();
  const [item, setItem] = useState({});
  const [errors, setErrors] = useState(initialErrors);
  const [isUploading, setIsUploading] = useState(false);
  const fetchitem = async () => {
    const { data } = await axios.get(
      `https://fvlqu9sace.execute-api.eu-south-1.amazonaws.com/dev/items/finditembyid/${id}`
    );
    setItem(data.body);
  };
  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        // Checks if the name will be empty and place it
        if (e.target.value === "") {
          setItem({ ...item, name: e.target.value });
          setErrors({ ...errors, name: false });
          break;
        }
        // Check if the name contains symbols or numbers
        if (/^[A-Za-z]+$/.test(e.target.value)) {
          setItem({ ...item, name: e.target.value });
          e.target.value !== ""
            ? setErrors({ ...errors, name: false })
            : setErrors({ ...errors, name: true });
        } else {
          setItem({ ...item, name: e.target.value });
          setErrors({ ...errors, name: true });
        }
        break;
      case "unit":
        if (e.target.value === "") {
          setItem({ ...item, unit: e.target.value });
          setErrors({ ...errors, unit: true });
          break;
        }
        if (/^[1-90]+$/.test(e.target.value)) {
          setItem({ ...item, unit: e.target.value });
          setErrors({ ...errors, unit: false });
        } else {
          setErrors({ ...errors, unit: true });
          setItem({ ...item, unit: e.target.value });
        }
        break;
      case "price":
        if (e.target.value === "") {
          setItem({ ...item, price: e.target.value });
          setErrors({ ...errors, price: true });
          break;
        }
        if (/^[1-90]+$/.test(e.target.value)) {
          setItem({ ...item, price: e.target.value });
          setErrors({ ...errors, price: false });
        } else {
          setErrors({ ...errors, price: true });
          setItem({ ...item, price: e.target.value });
        }
        break;
      case "category":
        setItem({ ...item, category: e.target.value });
    }
  };

  const updateItem = async (e) => {
    try {
      e.preventDefault();
      if (
        errors.name === false &&
        errors.price === false &&
        errors.unit === false
      ) {
        setIsUploading(true);
        const itemUpdated = await axios.patch(
          `https://whror49dn5.execute-api.eu-south-1.amazonaws.com/dev/items/updateItems/${id}/${item.name}/${item.price}/${item.unit}/${item.category}`,
          null,
          {headers:{"Authorization":localStorage.getItem('idToken')}}
        );
        if (itemUpdated.status === 201) {
          setIsUploading(false);
          toast.success("Item updated succesfully");
          history.push("/");
        }
      }
    } catch (error) {
      toast.error("Please change your inputs");
    }
  };
  useEffect(() => {
    fetchitem();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="input_form">
      <div
        style={
          isUploading ? { visibility: "visible" } : { visibility: "hidden" }
        }
        className="upper-top"
      >
        <ReactLoading
          className="upper-top"
          type="spinningBubbles"
          color="red"
          height="150px"
          width="150px"
        />
      </div>
      <form onSubmit={updateItem}>
        <div class="form-group">
          <label for="exampleInputEmail1">Name</label>
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
            value={item.name}
            name="name"
            type="text"
            class="form-control"
            onChange={handleChange}
            style={
              errors.name === true
                ? {
                    border: "solid 1px red",
                    boxShadow: "0 0 0 .2rem rgba(255,0,0,.25)",
                  }
                : {}
            }
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Price</label>
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
            value={item.price}
            name="price"
            type="text"
            class="form-control"
            onChange={handleChange}
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
        <div class="form-group">
          <label for="exampleInputPassword1">Unit</label>
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
            value={item.unit}
            name="unit"
            type="text"
            class="form-control"
            onChange={handleChange}
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
        <div className="select_input">
          <p className="input_label">Category</p>
          <select
            name="category"
            className="form-control"
            value={item.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" class="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </div>
  );
};
