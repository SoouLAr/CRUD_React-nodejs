import axios from "axios";
import { React, useEffect, useState } from "react";
import ReactLoading from "react-loading";

export const Item = ({ ItemComponent , isItemAdded}) => {
  const [items, setItems] = useState([]);
  const fetchItems = async () => {
    const { data } = await axios.get(
      "https://fvlqu9sace.execute-api.eu-south-1.amazonaws.com/dev/items"
    );
    setItems(data.items);
  };
  useEffect(() => {
    fetchItems();
  }, [isItemAdded]);
  if (items.length===0){
    return (
      <ReactLoading
      className="loader"
        type="spinningBubbles"
        color="red"
        height="150px"
        width="150px"
      />
    )
  } else {
  return (
    <div style={{ marginTop: "30px" }}>
      <h1 className="items__header">Items</h1>
      <div className="items">
        {items.map((item) => (
          <ItemComponent key={item._id} props={item} />
        ))}
      </div>
    </div>
  );
}
};
