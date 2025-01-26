// app.js

const express = require("express");
const handlebars = require("express-handlebars");

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

app.listen(3000);