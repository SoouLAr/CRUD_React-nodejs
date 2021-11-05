import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import {ModalItem} from "./Components/modals/modalCreateItem";
import toast, { Toaster } from "react-hot-toast";
import { CategoryComponent } from "./Components/category/categoryComponent";
import { ItemComponent } from "./Components/item-wrapper/itemCategory";
import { Route, Switch } from "react-router";
import { Item } from "./Components/items/Item";
import { ItemPreview } from "./Components/items/ItemPreview";
import { ItemsByCategory } from "./Components/items/itemsbyCategory";
import { EditItem } from "./Components/edit-item/EditItem";
import { Header } from "./Components/header/Header";
import {ContactUs} from './Components/contact-us/ContactUs'
import { ModalCategory } from "./Components/modals/modalCreateCategory";
import { NotFound } from "./Components/not-found/NotFound";
import "./homepage.css";

function HomePage() {
  const [errors, setErrors] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [categoryAdded,setCategoryAdded]=useState(0)
  const [isSuccesCreatedItem, setIsSuccesCreatedItem] = useState(0);
  const [categories, setCategories] = useState([]);
  const [didCategoryChange, setDidCategoryChange] = useState(false);
  const [itemModal,setItemModal]=useState(true)
  const [modalCategoryOpen, setModalCategoryOpen] = useState(false);
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

  const fetchCategories = async () => {
    const { data } = await axios.get("http://127.0.0.1:5000/category");
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, [categoryAdded]);

  return (
    <div className="homepage">
      <Toaster position="top-center" reverseOrder={false} />
      <Header
        setItemModal={setItemModal}
        itemModal={itemModal}
        setIsOpen={setIsOpen}
        setModalCategoryOpen={setModalCategoryOpen}
        isSuccesCreatedItem={isSuccesCreatedItem}
        setIsSuccesCreatedItem={setIsSuccesCreatedItem}
        setCategories={setCategories}
      />
      <div className="bodyMix bg-light">
        <div className="categories">
          <h2 className="category__header"> Categories</h2>
          <Slider {...settings}>
            {categories.map((item) => {
              return (
                <CategoryComponent
                  categoryAdded={categoryAdded}
                  setCategoryAdded={setCategoryAdded}
                  didCategoryChange
                  setDidCategoryChange={() => {
                    setDidCategoryChange(!didCategoryChange);
                  }}
                  key={item._id}
                  item={item}
                />
              );
            })}
          </Slider>
        </div>
        <Switch>
          <Route exact path="/">
            <Item ItemComponent={ItemComponent} />
          </Route>
          <Route path="/contactUs">
            <ContactUs />
          </Route>
          <Route path="/category/:id">
            <ItemsByCategory didCategoryChange={didCategoryChange} />
          </Route>
          <Route path="/edit/:id">
            <EditItem categories={categories} toast={toast} />
          </Route>
          <Route  path="/items/:_id">
            <ItemPreview />
          </Route>
          <Route path="*" component={NotFound} />
        </Switch>
        <ModalItem
          itemModal={itemModal}
          modalIsOpen={modalIsOpen}
          closeModal={() => setIsOpen(false)}
          categories={categories}
          ariaHideApp={false}
          errors={errors}
          setErrors={setErrors}
        />
        <ModalCategory
          categoryAdded={categoryAdded}
          setCategoryAdded={setCategoryAdded}
          itemModal={itemModal}
          modalCategoryOpen={modalCategoryOpen}
          closeModal={() => setModalCategoryOpen(false)}
          ariaHideApp={false}
        />
      </div>
    </div>
  );
}

export default HomePage;
