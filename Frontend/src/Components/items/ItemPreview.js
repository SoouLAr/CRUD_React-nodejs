import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ItemDetails } from "../item-details/itemDetails";
import ReactLoading from "react-loading";
import toast from "react-hot-toast";

export const ItemPreview = () => {
  const { _id } = useParams();
  const [item, setItem] = useState({});
  const [isLoading,setIsLoading]=useState(true)
  const fetchItem = async () => {
    try {
        setIsLoading(true)
      const { data } = await axios.get(
        ` https://fvlqu9sace.execute-api.eu-south-1.amazonaws.com/dev/items/finditembyid/${_id}`
      );
      setItem(data.body);
      setIsLoading(false)
    } catch (error) {
        setIsLoading(true)
        toast.error("Something went wrong!")
      console.log(error);
    }
  };
  useEffect(() => {
    fetchItem();
  }, [_id]);
  if (isLoading === true ) {
    return (
      <ReactLoading
        className="loader"
        type="spinningBubbles"
        color="red"
        height="150px"
        width="150px"
      />
    );
  } else {
    return <ItemDetails item={item} />;
  }
};
