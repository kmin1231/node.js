// app.js

const express = require("express");
const handlebars = require("express-handlebars");
const req = require("express/lib/request");

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

app.listen(3000);