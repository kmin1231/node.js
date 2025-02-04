// app.js

const express = require("express");
const handlebars = require("express-handlebars");
const req = require("express/lib/request");

const mongodbConnection = require("./configs/mongodb-connection");

const hbsHelpers = require("./configs/handlebars-helpers");

const postService = require("./services/post-service");

const { ObjectId } = require("mongodb");
const { padStart } = require("lodash");

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
    res.render("write", { title: "test board", mode: "create" });
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
        return res.json({ isExist: true });
    }
});

app.get("/modify/:id", async (req, res) => {
    const post = await postService.getPostById(collection, req.params.id);
    console.log(post);
    res.render("write", { title: "Test Board", "mode": "modify", post });
});

app.post("/modify/", async (req, res) => {
    const { id, title, writer, password, content } = req.body;

    const post = {
        title,
        writer,
        password,
        content,
        createdDt: new Date().toISOString(),
    };

    const result = await postService.updatePost(collection, id, post);
    res.redirect(`/detail/${id}`);
});

app.delete("/delete", async (req, res) => {
    const { id, password } = req.body;

    try {
        const result = await collection.deleteOne({ _id: ObjectId(id), password: password });

        if (result.deletedCount !== 1) {
            console.log("Deletion failed!");
            return res.json({ isSuccess: false });
        }

        return res.json({ isSuccess: true });
    } catch (error) {
        console.error(error);
        return res.json({ isSuccess: false });
    }
});

app.post("/write-comment", async (req, res) => {
    const { id, name, password, comment } = req.body;
    const post = await postService.getPostById(collection, id);

    if (post.comments) {
        post.comments.push({
            idx: post.comments.length + 1,
            name,
            password,
            comment,
            createdDt: new Date().toISOString(),
        });
    } else {
        post.comments = [
            {
                idx: 1,
                name,
                password,
                comment,
                createdDt: new Date().toISOString(),
            },
        ];
    }

    postService.updatePost(collection, id, post);
    return res.redirect(`/detail/${id}`);
});

app.delete("/delete-comment", async (req, res) => {
    const { id, idx, password } = req.body;

    const post = await collection.findOne(
        {
            _id: ObjectId(id),
            comments: { $elemMatch: { idx: parseInt(idx), password } },
        },
        postService.projectionOption,
    );

    if (!post) {
        return res.json({ isSuccess: false });
    }

    post.comments = post.comments.filter((comment) => comment.idx != idx);
    postService.updatePost(collection, id, post);
    return res.json({ isSuccess: true });
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