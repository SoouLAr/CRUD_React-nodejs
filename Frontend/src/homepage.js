import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import Loader from "./Components/loader/Loader";
import ModalItem from "./Components/modalCreateItem";
import toast, { Toaster } from "react-hot-toast";
import { CategoryComponent } from "./Components/category/categoryComponent";
import { ItemComponent } from "./Components/itemCategory";
import { Route, Switch } from "react-router";
import { Item } from "./Components/Item";
import { ItemPreview } from "./Components/ItemPreview";
import { Link } from "react-router-dom";
import { ItemsByCategory } from "./Components/itemsbyCategory";
import { EditItem } from "./Components/edit-item/EditItem"
import {Header}from './Components/header/Header'
import "./homepage.css";


function HomePage() {
  const [errors, setErrors] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isSuccesCreatedItem, setIsSuccesCreatedItem] = useState(0);
  const [categories, setCategories] = useState([]);
  const [categoryDidChnage,setCategoryDidChange]=useState(0)
  const [didItemsFetch,setdDdItemsFetch]=useState(0)
  const [hasCategoryChange,setHasCategoryChange]=useState(0)


  const viewidth =
    document.documentElement.clientWidth < 640
      ? 1
      : document.documentElement.clientWidth > 1280
      ? 3
      : 2;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: viewidth,
    slidesToScroll: viewidth,
  };

  const createItem = (name, price, unit, image, category) => {
    setIsOpen(true);
    axios
      .post("http://127.0.0.1:5000/item/addItem", {
        name: name,
        price: price,
        unit: unit,
        image: image,
        category: category,
      })
      .then((res) => {
        setIsSuccesCreatedItem(isSuccesCreatedItem + 1);
        setIsOpen(false);
        toast.success("Item added success!");
      })
      .catch((e) => {
        setErrors(e.response.data);
        toast.error("Item failed to add");
      });
  };

  const fetchCategories= async()=>{
    const {data} = await  axios.get("http://127.0.0.1:5000/category")
    setCategories(data)
  }

  useEffect(()=>{
    fetchCategories()
  },[])

  return (
    <div className="homepage">
      <Toaster position="top-center" reverseOrder={false} />
      <Header setIsOpen={setIsOpen} isSuccesCreatedItem={isSuccesCreatedItem} setIsSuccesCreatedItem={setIsSuccesCreatedItem} setCategories={setCategories} />
        <div className="bodyMix">
          <div className="categories">
            <h2 className="category__header"> Categories</h2>
            <Slider {...settings}>
              {categories.map((item) => {
                  return (
                      <CategoryComponent key={item._id} item={item} />
                  )
              })}
            </Slider>
          </div>
          <Switch>
          <Route  exact path="/">
              <Item
                Loader={Loader}
                ItemComponent={ItemComponent}
              />
            </Route>
            <Route  path="/category/:id">
              <ItemsByCategory categoryDidChnage={categoryDidChnage} />
            </Route>
            <Route  path="/edit/:id">
                <EditItem toast={toast} />
            </Route>
            <Route>
              <Route  path="/items/:_id">
                <ItemPreview />
              </Route>
            </Route>
          </Switch>
          <ModalItem
            modalIsOpen={modalIsOpen}
            closeModal={() => setIsOpen(false)}
            categories={categories}
            addItem={createItem}
            ariaHideApp={false}
            errors={errors}
            setErrors={setErrors}
          />
        </div>
    </div>
  );
}

export default HomePage;
