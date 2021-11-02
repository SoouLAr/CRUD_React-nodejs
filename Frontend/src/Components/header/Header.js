import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

export const Header = ({setIsOpen,setIsSuccesCreatedItem})=>{
    return (
        <div className="header">
        <div
          onClick={() => {
            setIsSuccesCreatedItem();
          }}
          className="header__title"
        >
          <Link className="header" to="/">
            Magazina
          </Link>
        </div>
        <button
          className="open__modal"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Create Item
        </button>
      </div>
    )
}