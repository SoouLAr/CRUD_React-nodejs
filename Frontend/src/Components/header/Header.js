import React from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const Header = ({ setIsOpen, setIsSuccesCreatedItem, setItemModal, setModalCategoryOpen, setLogininmodal }) => {

  const logOut = ()=>{
    localStorage.removeItem('idToken')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    window.location.reload(true)
  }

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
        style={{width:"150px"}}
        className="d-flex  justify-content-between"
        >
          <div>
          <i class="bi bi-person mr-1"></i>
          <span>{jwt_decode(localStorage.getItem('idToken'))["cognito:username"]}</span> 
          </div>
          <div className="logOut" style={{cursor: "pointer"}} onClick={logOut}>
              <span>Log out</span>
              <i class="bi bi-box-arrow-in-right ml-1"></i>
          </div>
        </div>
       :
       <div 
            style={{cursor:"pointer"}}
            onClick={()=>{
              setLogininmodal(true)
            }}
            >
              Login/Sign Up
            </div>}
    </nav>
  );
};
