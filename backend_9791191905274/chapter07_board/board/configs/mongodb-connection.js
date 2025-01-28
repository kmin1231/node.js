// mongodb-connection.js

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://minkhu:mongopw@cluster0.gfeye.mongodb.net/board?retryWrites=true&w=majority&appName=Cluster0";

module.exports = function (callback) {
    return MongoClient.connect(uri, callback);
};