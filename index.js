// env
const dotenv = require("dotenv");
dotenv.config();

// mongodb connection
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// import dataservice file from service folder
const dataservice = require("./service/dataservice");

// import jsonwebtoken

const jwt = require("jsonwebtoken");

// to import express

const express = require("express");

// create app

const app = express();

// To covert json data

app.use(express.json());

// middleware to verify token

const jwtMiddleware = (req, res, next) => {
  console.log("jwtMiddleware");
  try {
    const token = req.headers["access-token"];
    const data = jwt.verify(token, "secretkeynotfind4532");
    console.log(data);
    next();
  } catch {
    res.status(401).json({
      statusCode: 401,
      status: false,
      message: "Login to Continue",
    });
  }
};

app.post("/register", async (req, res) => {
  try {
    const result = await dataservice.register(
      req.body.uname,
      req.body.acno,
      req.body.psw
    );

    if (!result) {
      throw new Error("Registration result is undefined");
    }

    res.status(result.statusCode).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const result = await dataservice.login(req.body.acno, req.body.psw);
    res.status(result.statusCode).json(result);
  } catch (error) {
    // Handle any unexpected errors here
    console.error("An error occurred during login:", error);
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: "Internal Server Error",
    });
  }
});

app.post("/deposit", jwtMiddleware, async (req, res) => {
  try {
    var result = await dataservice.deposit(
      req.body.acno,
      req.body.psw,
      req.body.amount
    );
    res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("An error occured during deposit:", error);
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: "internal server error",
    });
  }
});

// withdraw

app.post("/withdraw", jwtMiddleware, async (req, res) => {
  try {
    var result = await dataservice.withdraw(
      req.body.acno,
      req.body.psw,
      req.body.amount
    );
    res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("An error occcured during withdraw:", error);
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: "Internal server error",
    });
  }
});

// transaction history

app.post("/transaction", jwtMiddleware, (req, res) => {
  var result = dataservice.gettransaction(req.body.acno);
  res.status(result.statusCode).json(result);
});
// delete

// GET

// app.get("", (req, res) => res.send("get method checking......"));

// // post
// app.post("", (req, res) => res.send("post method checking......"));

// // put
// app.put("", (req, res) => res.send("put method checking......"));

// // patch
// app.patch("", (req, res) => res.send("patch method checking......"));

// // delete
// app.delete("", (req, res) => res.send("delete method checking......"));

// set port
app.listen(3000, () => {
  console.log("server started at port number 3000");
});
