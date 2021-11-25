import React from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const Header = ({ setIsOpen, setIsSuccesCreatedItem, setItemModal, setModalCategoryOpen, setLogininmodal }) => {
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
          {localStorage.getItem('idToken') && <li class="nav-item">
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
          </li>}
          {localStorage.getItem('idToken') && <li class="nav-item">
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
          </li>}
          <li class="nav-item" >
            <Link to="/about" class="nav-link">About</Link>
          </li>
        </ul>
      </div>
      {localStorage.getItem('idToken')?
        <div 
        style={{cursor:"pointer"}}
        onClick={()=>{
          setLogininmodal(true)
        }}
        class="nav-link" 
        to="/s"
        >
          {jwt_decode(localStorage.getItem('idToken'))["cognito:username"]}
        </div>
       :
       <div 
            style={{cursor:"pointer"}}
            onClick={()=>{
              setLogininmodal(true)
            }}
            class="nav-link" 
            to="/s"
            >
              Login/Sign Up
            </div>}
    </nav>
  );
};
