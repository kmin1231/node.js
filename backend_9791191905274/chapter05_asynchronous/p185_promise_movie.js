// p185_promise_movie.js

const axios = require("axios");  // imports 'axios'
const url = "https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";

axios
    .get(url)  // sends a GET request to the specified 'url' using 'axios'
    .then((result) => {  // executed when the GET request is successfully done
        if (result.status != 200) {
            throw new Error("The request has failed!");
        }

        if (result.data) {  // checks if the response data exists
            return result.data;  // if data exists, returns 'data'
        }

        throw new Error("No data exists...");
    })
    .then((data) => {  // defines a new callback function that takes 'data' (from previous 'then' block)
        if (!data.articleList || data.articleList.size == 0) {
            throw new Error("No data exists...");  // does not exist OR, empty
        }
        return data.articleList;  // if it exists, returns it
    })
    .then((articles) => {  // defines a new callback function
        return articles.map((article, idx) => {  // maps over 'articles' array -> creates a new array
            return { title: article.title, rank: idx + 1};  // returns an object of title & rank
        });
    })
    .then((results) => {  // defines a new callback function
        for (let movieInfo of results) {  // iterates over 'results' array
            console.log(`[rank ${movieInfo.rank}] ${movieInfo.title}`);
        }
    })
    .catch((err) => {  // defines a callback function for exception handling
        console.log("<<ERROR has occurred!>>");
        console.error(err);
    });