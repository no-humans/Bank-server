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
    const token = req.body.token;
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

// requests

// register

app.post("/register", (req, res) => {
  const result = dataservice.register(
    req.body.uname,
    req.body.acno,
    req.body.psw
  );
  res.status(result.statusCode).json(result);
  // if (result){
  //   res.send("Registration  success")
  // }
  // else{
  //   res.send("user already exist")
  // }
  // res.send("success");
  // console.log(req.body);
});

// login
app.post("/login", (req, res) => {
  const result = dataservice.login(req.body.acno, req.body.psw);
  res.status(result.statusCode).json(result);
});
// deposit
app.post("/deposit", jwtMiddleware, (req, res) => {
  const result = dataservice.deposit(
    req.body.acno,
    req.body.psw,
    req.body.amount
  );
  res.status(result.statusCode).json(result);
});

// withdraw

app.post("/withdraw", jwtMiddleware, (req, res) => {
  const result = dataservice.withdraw(
    req.body.acno,
    req.body.psw,
    req.body.amount
  );
  res.status(result.statusCode).json(result);
});

// transaction history

app.post("/transaction", jwtMiddleware, (req, res) => {
  const result = dataservice.gettransaction(req.body.acno);
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
