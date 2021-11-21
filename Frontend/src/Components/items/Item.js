import axios from "axios";
import { React, useEffect, useState } from "react";
import ReactLoading from "react-loading";

export const Item = ({ ItemComponent }) => {
  const [items, setItems] = useState([]);
  const fetchItems = async () => {
    const { data } = await axios.get(
      "https://rg7ptpz3jb.execute-api.eu-south-1.amazonaws.com/dev/getAllItems"
    );
    setItems(...items, data.items);
  };
  useEffect(() => {
    fetchItems();
  }, []);
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
