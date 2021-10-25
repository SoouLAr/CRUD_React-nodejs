import axios from "axios";
const mongoose = require("mongoose");
const request = require("supertest");

const id = "6172cdd058e6bc1cc2fe2890";
const urlBase = "http://localhost:5000";

describe("Item API testing", () => {
  it("Get all items and check if the array is completed", async () => {
    let allItems = await request(urlBase)
      .get("/item")
      .expect(200)
      .expect("Content-Type", /json/);
    expect(allItems.body).not.toBe([]);
  });

  it("Add an item and check if the database is updated", async () => {
    const item = {
      id: id,
      name: "Test1",
      unit: 10,
      price: 700,
      image: "RandomLink",
      category: "61546a9f560152d1b96b4687",
    };
    request(urlBase)
      .post("/item/addItem")
      .send(item)
      .end(function (err, res) {
        if (err) return err;
        else {
          expect(res.body.status).toBe(201);
        }
      });
  });

  it("Delete and item and check if that item is deleted and find element by that ID", async () => {
    await axios.delete("http://localhost:5000/item/deleteItem/" + id);
    const response = await request(urlBase).delete("/item/deleteItem/" + id);
    expect(response.body.status).toBe(201);
  });

  it("Update an item and get that item API ", async () => {
    const itemUpdated = {
      name: "TestUpdated",
      unit: 1010,
      price: 701,
      image: "RandomLink",
      category: "61546a9f560152d1b96b4687",
    };
    const updatedItem = await request("http://localhost:5000/")
      .patch("item/updateItem/6172cdd058e6bc1cc2fe2899")
      .send(itemUpdated);
    expect(updatedItem.status).toBe(200);
  });
});

// describe("Category automatic testing API-s", () => {
//   it("Get all categoryies", async () => {
//     let allCategories = await axios
//       .get("http://localhost:5000/category")
//       .then((res) => {
//         return res.data;
//       })
//       .catch((err) => console.log(err));
//     expect(allCategories).not.toBe([]);
//   });
//   it("Add an Category and check if the database is updated", async () => {
//     let oldCategories = await axios
//       .get("http://localhost:5000/category")
//       .then((res) => {
//         return res.data;
//       })
//       .catch((err) => console.log(err));
//     const category = {
//       names: ["NewCategory"],
//       images: "RandomLink",
//     };
//     axios.post("http://localhost:5000/category/addCategory", {
//       names: category.names,
//       images: category.images,
//     });
//     const newCategories = await axios
//       .get("http://localhost:5000/category")
//       .then((res) => {
//         return res.data;
//       })
//       .catch((err) => console.log(err));
//     expect(newCategories).not.toBe(oldCategories);
//   });
// });
