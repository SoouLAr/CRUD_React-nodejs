import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-hot-toast";
import "../edit-item/EditItem.css"

export const EditItem = ({categories}) => {
  const { id } = useParams();
  const history = useHistory();
  const [item, setItem] = useState({});
  const fetchitem = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/item/getItem/${id}`
    );
    setItem(data);
  };
  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };
  

  const updateItem = async (e) => {
    e.preventDefault();
    const itemUpdated = await axios.patch(
      `http://localhost:5000/item/updateItem/${id}`,
      item
    );

    if (itemUpdated.status === 200) {
      toast.success("Item updated succesfully");
      history.push("/");
    }
  };
  useEffect(() => {
    fetchitem();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="input_form">
      <form onSubmit={updateItem}>
        <div class="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input
            value={item.name}
            name="name"
            type="text"
            class="form-control"
            onChange={handleChange}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Price</label>
          <input
            value={item.price}
            name="price"
            type="number"
            class="form-control"
            onChange={handleChange}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Unit</label>
          <input
            value={item.unit}
            name="unit"
            type="number"
            class="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="select_input">
          <p className="input_label">Category</p>
          <select
            name="category"
            className="form-control ml-4 "
            value={item.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.names}
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
