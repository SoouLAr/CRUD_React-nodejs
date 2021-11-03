import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const Header = ({ setIsOpen, setIsSuccesCreatedItem }) => {
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
            <Link class="nav-link" to="/contact-us">
              Contact Us
            </Link>
          </li>
          <li class="nav-item">
            <div
              class="nav-link"
              onClick={() => {
                setIsOpen(true);
              }}
              to="/s"
            >
              Add Item
            </div>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/s">
              Add Category
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
