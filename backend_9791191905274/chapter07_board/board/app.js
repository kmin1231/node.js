// app.js

const express = require("express");
const handlebars = require("express-handlebars");
const req = require("express/lib/request");

const mongodbConnection = require("./configs/mongodb-connection");

const app = express();

app.engine("handlebars", handlebars.engine({
    layoutsDir: __dirname + "/views",
    defaultLayout: 'main'
}))

app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
    res.render("home", { title: "test board" });
});

app.get("/write", (req, res) => {
    res.render("write", { title: "test board" })
});

app.get("/detail/:id", async (req, res) => {
    res.render("detail", {
        title: "Test Board",
    });
});


let collection;

app.listen(3000, async () => {
    console.log("Server started");

    const mongoClient = await mongodbConnection();

    collection = mongoClient.db().collection("post");
    console.log("MongoDB connected");

    // test database connection
    const testData = [
        {
            title: "First Post",
            content: "content of the first post",
            createdAt: new Date("2025-01-25T00:00:00"),
        },
        {
            title: "Second Post",
            content: "content of the second post",
            createdAt: new Date("2025-01-27T00:00:00"),
        },
        {
            title: "Third Post",
            content: "content of the third post",
            createdAt: new Date("2025-01-29T00:00:00"),
        }
    ];

    collection.insertMany(testData)
});