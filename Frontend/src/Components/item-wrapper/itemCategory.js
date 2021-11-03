import React from "react";
import { Link } from "react-router-dom";
import '../item-wrapper/itemCategory.css'

export const ItemComponent = ({ props }) => {
  return (
    <div  class="col-lg-2 col-md-4 col-sm-6 col-xs-12 mt-5" style={{height:'290px'}}>
      <div class="hovereffect">
        <img class="img-responsive" width="100%" height='100%' src={`${props.image}`} alt="" />
        <div class="overlay">
          <h2>{`${props.name}`}</h2>
          <Link  class="info" to={`/items/${props._id}`}>
            link here
          </Link>
        </div>
      </div>
    </div>
  );
};
