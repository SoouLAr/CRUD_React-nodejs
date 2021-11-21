import React from "react";
import { Link } from "react-router-dom";

export const Header = ({ setIsOpen, setIsSuccesCreatedItem,setItemModal,setModalCategoryOpen }) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Link
        class="navbar-brand"
        to="/"
        onClick={() => {
          setIsSuccesCreatedItem();
        }}
      >
        Magazinë
      </Link>
      <div class="collapse navbar-collapse  " id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <Link class="nav-link" to="/contactUs">
              Contact Us
            </Link>
          </li>
          <li class="nav-item">
            <div
              style={{cursor:"pointer"}}
              class="nav-link"
              onClick={() => {
                setItemModal(true)
                setIsOpen(true);
              }}
              
            >
              Add Item
            </div>
          </li>
          <li class="nav-item">
            <div 
            style={{cursor:"pointer"}}
            onClick={()=>{
              setModalCategoryOpen(true)
            }}
            class="nav-link" 
            to="/s"
            >
              Add Category
            </div>
          </li>
          <li class="nav-item" >
            <Link to="/about" class="nav-link">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
