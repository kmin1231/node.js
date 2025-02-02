// app.js

const express = require("express");
const handlebars = require("express-handlebars");
const req = require("express/lib/request");

const mongodbConnection = require("./configs/mongodb-connection");

const hbsHelpers = require("./configs/handlebars-helpers");

const postService = require("./services/post-service");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine({
    layoutsDir: __dirname + "/views",
    defaultLayout: 'main',
    helpers: hbsHelpers,
}))

app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1;     // page '1' by default
    const search = req.query.search || "";          // search word
    
    try {
        const [posts, paginator] = await postService.list(collection, page, search);
        res.render("home", { title: "test board", search, paginator, posts });
    } catch (error) {
        console.error(error);
        res.render("home", { title: "test board" });
    }
});

app.get("/write", (req, res) => {
    res.render("write", { title: "test board" })
});

app.post("/write", async (req, res) => {
    const post = req.body;
    const result = await postService.writePost(collection, post);
    res.redirect(`/detail/${result.insertedId}`);
});

app.get("/detail/:id", async (req, res) => {
    const result = await postService.getDetailPost(collection, req.params.id);
    res.render("detail", {
        title: "Test Board",
        post: result.value,
    });
});

app.post("/check-password", async (req, res) => {
    const { id, password } = req.body;

    const post = await postService.getPostByIdAndPassword(collection, { id, password });

    if (!post) {
        return res.status(404).json({ isExist: false });
    } else {
        return res.jsoon({ isExist: true });
    }
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

    // collection.insertMany(testData)

    // test helper function
    // console.log(hbsHelpers.lengthOfList([1, 2, 3, "a"]));
    // console.log(hbsHelpers.eq(5, 5));
    // console.log(hbsHelpers.eq(2, 3));
    // console.log(hbsHelpers.dateString("2025-01-01T00:00:00Z"));
});