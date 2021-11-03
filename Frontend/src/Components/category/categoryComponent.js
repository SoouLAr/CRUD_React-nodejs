import React from "react";
import { Link } from "react-router-dom";
import "../carousel/carousel.css";

export const CategoryComponent = ({ item,setDidCategoryChange,didCategoryChange}) => {
  return (
    <div
      class="col-lg-12 col-md-4 col-sm-6 col-xs-12 mt-5"
      style={{ height: "290px" }}
    >
      <div class="hovereffect">
        <img
          class="img-responsive"
          width="100%"
          height="100%"
          src={`${item.images}`}
          alt=""
        />
        <div class="overlay">
          <h2>{`${item.names[0]}`}</h2>
          <Link 
          onClick={()=>{setDidCategoryChange()}} 
            class="info" to={`/category/${item._id}`}>
            link here
          </Link>
        </div>
      </div>
    </div>
  );
};
