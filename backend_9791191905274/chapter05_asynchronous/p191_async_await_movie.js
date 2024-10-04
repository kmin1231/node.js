// p191_async_await_movie.js

const axios = require("axios");

// defines asynchronous function
async function getTop20Movies() {
    const url = "https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";

    // try-catch statement for exception handling
    try {
        const result = await axios.get(url);
        // uses 'await' to PAUSE the execution until the HTTP GET request to the specified URL is completed

        const { data } = result;  // extracts 'data' using destructuring assignment
        if (!data.articleList || data.articleList.size == 0) {
            throw new Error("No data exists...");  // does not exist OR, empty
        }

        const movieinfos = data.articleList.map((article, idx) => {
        // creates a new array 'movieinfos' by mapping over 'data.articleList'
        // -- transforms each 'article' into an object containing its title & rank

            return { title: article.title, rank: idx + 1};  // returns an object of title & rank (for each 'article')
        });

        for (let movieInfo of movieinfos) {
            console.log(`[rank ${movieInfo.rank}] ${movieInfo.title}`);
        }
    } catch (err) {
        // 'catch' block for handling any errors thrown within 'try' block
        throw new Error(err);
    }
}

getTop20Movies();