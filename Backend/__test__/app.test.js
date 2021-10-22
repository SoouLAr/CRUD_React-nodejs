import axios from "axios";
const mongoose = require("mongoose");
const request = require("supertest");

const id = "6172cdd058e6bc1cc2fe28f5";
const urlBase = "http://localhost:5000";

describe("Item API testing", () => {
  it("Get all items and check if the array is completed", async () => {
    let allItems = await request(urlBase)
      .get("/item")
      .expect(200)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
    expect(allItems).not.toBe([]);
  });

  it("Add an item and check if the database is updated", async () => {
    let oldItems = await axios
      .get("http://localhost:5000/item")
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
    const item = {
      name: "Test",
      unit: 10,
      price: 700,
      image: "RandomLink",
      category: "61546a9f560152d1b96b4687",
    };
    axios.post("http://localhost:5000/item/addItem", {
      name: item.name,
      unit: item.unit,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    const newItems = await axios
      .get("http://localhost:5000/item")
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
    expect(newItems).not.toBe(oldItems);
  });

  it("Update an item and get that item API ", async () => {
    let item = await axios
      .get("http://localhost:5000/item/getItem/" + id)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
    const itemUpdated = {
      name: "TestUpdated",
      unit: 101,
      price: 701,
      image: "RandomLink",
      category: "61546a9f560152d1b96b4687",
    };
    axios.patch("http://localhost:5000/item/updateItem/" + id, {
      name: itemUpdated.name,
      unit: itemUpdated.unit,
      price: itemUpdated.price,
      image: itemUpdated.image,
      category: itemUpdated.category,
    });
    let newUpdatedItem = await axios
      .get("http://localhost:5000/item/getItem/" + id)
      .then((res) => {
        return res.data;
      });
    expect(item).not.toEqual(newUpdatedItem);
  });

  // it("Delete and item and check if that item is deleted and find element by that ID", async () => {
  //   let item = await axios
  //     .get("http://localhost:5000/item/getItem/" + id)
  //     .then((res) => {
  //       return res.data;
  //     })
  //     .catch((err) => console.log(err));
  //   axios.delete("http://localhost:5000/item/deleteItem/" + id);
  //   let newItems = await axios
  //     .get("http://localhost:5000/item")
  //     .then((res) => {
  //       return res.data;
  //     })
  //     .catch((err) => console.log(err));
  //   expect(newItems).not.toContain(item);
  // });
});

describe("Category automatic testing API-s", () => {
  it("Get all categoryies", async () => {
    let allCategories = await axios
      .get("http://localhost:5000/category")
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
    expect(allCategories).not.toBe([]);
  });
  it("Add an Category and check if the database is updated", async () => {
    let oldCategories = await axios
      .get("http://localhost:5000/category")
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
    const category = {
      names: ["NewCategory"],
      images: "RandomLink",
    };
    axios.post("http://localhost:5000/category/addCategory", {
      names: category.names,
      images: category.images,
    });
    const newCategories = await axios
      .get("http://localhost:5000/category")
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
    expect(newCategories).not.toBe(oldCategories);
  });
});
