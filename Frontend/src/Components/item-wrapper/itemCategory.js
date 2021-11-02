import React from "react";
import { Link } from "react-router-dom";
import '../item-wrapper/itemCategory.css'

export const ItemComponent = ({ props }) => {
  console.log(props);
  return (
    <div class="col-lg-2 col-md-3 col-sm-6 col-xs-12 mt-5">
      <div class="hovereffect">
        <img class="img-responsive" width="100%" height='100%' src={`${props.image}`} alt="" />
        <div class="overlay">
          <h2>{`${props.name}`}</h2>
          <Link class="info" to={`/items/${props._id}`}>
            link here
          </Link>
        </div>
      </div>
    </div>
  );
};
