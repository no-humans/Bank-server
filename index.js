// import dataservice file from service folder
const dataservice = require("./service/dataservice");

// to import express

const express = require("express");

// create app

const app = express();

// To covert json data

app.use(express.json());

// request

// register

app.post("/register", (req, res) => {
  const result = dataservice.register(
    req.body.uname,
    req.body.acno,
    req.body.psw
  )
  res.status(result.statusCode).json(result)
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
  const result = dataservice.login(
    req.body.acno,
    req.body.psw
  )
  res.status(result.statusCode).json(result)
})
// deposit
// withdraw
// transaction history
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
