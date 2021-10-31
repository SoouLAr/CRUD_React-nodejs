import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "./homepage.css";
import { CategoryComponent } from "../src/Components/categoryComponent";
import { ItemComponent } from "./Components/itemCategory";
import Loader from "./Components/Loader";
import ModalItem from "./Components/modalCreateItem";
import toast, { Toaster } from "react-hot-toast";
import { Route, Switch } from "react-router";
import { Item } from "./Components/Item";
import { ItemPreview } from "./Components/ItemPreview";
import { Link } from "react-router-dom";
import { ItemsByCategory } from "./Components/itemsbyCategory";

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isItemLoading, setIsItemLoading] = useState(false);
  const [isSuccesCreatedItem, setIsSuccesCreatedItem] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/category").then((res) => {
      setCategories(res.data);
    });
  }, [isSuccesCreatedItem]);

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
        console.log(e.response.data);
        setErrors(e.response.data);
        toast.error("Item failed to add");
      });
  };

  return (
    <div className="homepage">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="header">
        <div
          onClick={() => {
            setIsSuccesCreatedItem(isSuccesCreatedItem + 1);
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
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Loader />
        </div>
      ) : (
        <div className="bodyMix">
          <div className="categories">
            <h2 className="category__header"> Categories</h2>
            <Slider {...settings}>
              {categories.map((item) => {
                return <CategoryComponent key={item._id} {...item} />;
              })}
            </Slider>
          </div>
          <Switch>
            <Route exact path="/category/:id">
              <ItemsByCategory />
            </Route>
            <Route exact path="/">
              <Item
                setIsloading={setIsloading}
                isItemLoading={isItemLoading}
                Loader={Loader}
                items={items}
                ItemComponent={ItemComponent}
              />
            </Route>
            <Route>
              <Route exact path="/items/:_id">
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
      )}
    </div>
  );
}

export default HomePage;
