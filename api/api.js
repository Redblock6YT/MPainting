const express = require("express");
const app = express();
const https = require("https");
var fs = require("fs");
var privateKey = fs.readFileSync("rygb_cert/cloudflare/rygb.tech.pem", "utf8");
var certificate = fs.readFileSync("rygb_cert/cloudflare/rygb.tech.crt", "utf8");
var credentials = { key: privateKey, cert: certificate };
const mongoose = require("mongoose");
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect("mongodb+srv://api:fatcat2023@cluster0.jibn21y.mongodb.net/?retryWrites=true&w=majority", function (err) {
        if (err) throw err;
        console.log("> Connected to MongoDB Successfully!");
    });
}

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(8444, () => {
    console.log("Private https server listening on port 8444");
});

const Contacts = mongoose.model("Contacts", {
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    address: String,
    orders: Array,
    id: String,
});

const Orders = mongoose.model("Orders", {
    order_id: String,
    customer_id: String,
    order_date: String,
    order_status: String,
    order_type: String,
    order_items: Array,
});

app.get("/ping", (req, res) => {
    console.log("Pinged.")
    res.status(200).send("Connected to API.");
});