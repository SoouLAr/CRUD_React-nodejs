import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-hot-toast";
import "./EditItem.css";

export const EditItem = () => {
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
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
