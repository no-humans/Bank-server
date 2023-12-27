// server mdb integration

// import mongoose
const mongoose = require("mongoose");


// // mongodb connection


// state connection string via mongoose

// mongoose
//   .connect('mongodb://localhost:27017/bankserver')
//   .then(() => {
//     console.log("connected to MongoDB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Define a bank database model

const User = mongoose.model("User", {
  acno: Number,
  username: String,
  password: Number,
  balance: Number,
  transaction: [],
});

// export the schema to use in another files

module.exports={
    User
}


