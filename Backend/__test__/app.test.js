import axios from "axios";
const mongoose = require("mongoose");

describe("Item API testing", () => {
  it("Get all items and check if the array is completed", async () => {
    let allItem = await axios
      .get("http://localhost:5000/item")
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
    expect(allItem).not.toBe([]);
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
  it("Delete and item and check if that item is deleted and find element by that ID", async () => {
    const idForDelete = "6171caf6805d96772c042d0c"
    let item = await axios
      .get("http://localhost:5000/item/getItem/"+idForDelete)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
    axios.delete(
      "http://localhost:5000/item/deleteItem/"+idForDelete
    );
    let newItems = await axios
      .get("http://localhost:5000/item")
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
    expect(newItems).not.toContain(item);
  });
  it("Update an item and ",async()=>{
      const idForUpdate='6171c923db61c12ddd1ad445'
    let item = await axios
    .get("http://localhost:5000/item/getItem/"+idForUpdate)
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
    axios.patch("http://localhost:5000/item/updateItem/"+idForUpdate,{
        name: itemUpdated.name,
        unit: itemUpdated.unit,
        price: itemUpdated.price,
        image: itemUpdated.image,
        category: itemUpdated.category,
    })
    let newUpdatedItem = await axios
    .get("http://localhost:5000/item/getItem/"+idForUpdate)
    .then((res) => {
      return res.data;
    })
    expect(item).not.toEqual(newUpdatedItem)
  })
});
//koment