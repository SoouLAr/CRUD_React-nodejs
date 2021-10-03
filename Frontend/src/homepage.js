import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "./homepage.css";
import CategoryComponent from "../src/Components/categoryComponent";
import ItemComponent from "../src/Components/itemCategory";
import Loader from "./Components/Loader";
import ModalItem from "./Components/modalCreateItem";
import toast, { Toaster } from "react-hot-toast";

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isItemLoading, setIsItemLoading] = useState(false);
  const [isItems, setIsItems] = useState(true);
  const [isSuccesCreatedItem, setIsSuccesCreatedItem] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setIsloading(true);
    axios.get("http://127.0.0.1:3000/category").then((res) => {
      setCategories(res.data);
    });
    axios.get("http://127.0.0.1:3000/item").then((res) => {
      setItems(res.data);
      setIsloading(false);
      res.data.length === 0 ? setIsItems(false) : setIsItems(true);
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

  const getItems = (id) => {
    setIsItemLoading(true);
    axios
      .get("http://127.0.1:3000/item/getItemByCategory/" + id)
      .then((res) => {
        setItems(res.data);
        setIsItemLoading(false);
        res.data.length === 0 ? setIsItems(false) : setIsItems(true);
      })
      .catch((e) => {
        setIsItemLoading(false);
        console.log(e);
      });
  };

  const createItem = (name, price, unit, image, category) => {
    setIsOpen(true);
    axios
      .post("http://127.0.0.1:3000/item/addItem", {
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
          Magazina
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
                return (
                  <CategoryComponent
                    key={item._id}
                    {...item}
                    getItems={() => getItems(item._id)}
                  />
                );
              })}
            </Slider>
          </div>
          {isItemLoading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Loader />
            </div>
          ) : isItems ? (
            <div style={{ marginTop: "30px" }}>
              <h1 className="items__header">Items</h1>
              <div className="items">
                {items.map((item) => (
                  <ItemComponent key={item._id} props={item} />
                ))}
              </div>
            </div>
          ) : (
            <div className="noItems">
              <h1>I'm sorry</h1>
              <p>No item were found</p>
              <img
                src="https://cdn.shopify.com/s/files/1/1061/1924/products/Very_Sad_Face_Emoji_Icon_ios10_large.png"
                alt=""
                width="350px"
                height="350px"
              />
            </div>
          )}
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
