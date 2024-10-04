// p098_test_hello.js

import http from "k6/http";

export const options = {
    vus: 100,  // virtual users
    duration: "10s",  // tests for 10 seconds
};

export default function() {
    http.get("http://localhost:8000");
}