// import db.js

const db = require("./db");

// import jwt

const jwt = require("jsonwebtoken");

userDetails = {
  1000: {
    acno: 1000,
    username: "anu",
    password: 123,
    balance: 0,
    transaction: [],
  },
  1001: {
    acno: 1001,
    username: "john",
    password: 123,
    balance: 0,
    transaction: [],
  },
  1002: {
    acno: 1002,
    username: "Rengoku",
    password: 123,
    balance: 0,
    transaction: [],
  },
  1003: {
    acno: 1003,
    username: "wick",
    password: 123,
    balance: 0,
    transaction: [],
  },
};

// register
// const register = async (uname, acno, psw) => {
//   try {
//     const user = await db.User.findOne({ acno });

//     if (user) {
//       return {
//         statusCode: 401,
//         status: false,
//         message: "User already exists",
//       };
//     } else {
//       const newUser = new db.User({
//         acno,
//         username: uname,
//         password: psw,
//         balance: 0,
//         transaction: [],
//       });

//       await newUser.save();
//       console.log("User registered in MongoDB:", newUser);

//       return {
//         statusCode: 200,
//         status: true,
//         message: "Registration success",
//       };
//     }
//   } catch (error) {
//     console.error("Error during registration:", error);
//     throw {
//       statusCode: 500,
//       status: false,
//       message: "Internal server error",
//     };
//   }
// };

register = async (uname, acno, psw) => {
  try {
    const user = await db.User.findOne({ acno });
    if (user) {
      return {
        statusCode: 401,
        status: false,
        message: "user already exist",
      };
    } else {
      const newUser = new db.User({
        acno,
        username: uname,
        password: psw,
        balance: 0,
        transaction: [],
      });
      newUser.save();
      console.log("User registered in MongoDB:", newUser);
      return {
        statusCode: 200,
        status: true,
        message: "Registration success",
      };
    }
  } catch (error) {
    console.error("Error during registration:", error);
    throw {
      statusCode: 500,
      status: false,
      message: "Internal server error",
    };
  }
};

//   if (acno in userDetails) {
//     return {
//       statusCode: 401,
//       status: false,
//       message: "user already exist",
//     };
//   } else {
//     userDetails[acno] = {
//       acno,
//       username: uname,
//       password: psw,
//       balance: 0,
//       transaction: [],
//     };
//     console.log(userDetails);
//     return {
//       statusCode: 200,
//       status: true,
//       message: "Registration success",
//     };
//   }
// };

// login

login = (acno, psw) => {
  if (acno in userDetails) {
    if (psw == userDetails[acno]["password"]) {
      const token = jwt.sign({ currentAcno: acno }, "secretkeynotfind4532");
      return {
        statusCode: 200,
        status: true,
        message: "Login success",
        token,
      };
    } else {
      return {
        statusCode: 401,
        status: false,
        message: "Incorrect password",
      };
    }
  } else {
    return {
      statusCode: 401,
      status: false,
      message: "Incorrect account number",
    };
  }
};

// Deposit

deposit = (acno, password, amount) => {
  var amnt = parseInt(amount);
  if (acno in userDetails) {
    if (password == userDetails[acno]["password"]) {
      userDetails[acno]["balance"] += amnt;
      userDetails[acno]["transaction"].push({ type: "CREDIT", amount: amnt });
      return {
        statusCode: 200,
        status: true,
        message: userDetails[acno]["balance"],
      };
    } else {
      return {
        statusCode: 401,
        status: false,
        message: "Incorrect password",
      };
    }
  } else {
    return {
      statusCode: 401,
      status: false,
      message: "incorrect acccount number",
    };
  }
};

// withdraw

withdraw = (acno, password, amount) => {
  var amnt = parseInt(amount);
  if (acno in userDetails) {
    if (password == userDetails[acno]["password"]) {
      if (amnt <= userDetails[acno]["balance"]) {
        userDetails[acno]["balance"] -= amnt;
        userDetails[acno]["transaction"].push({
          type: "DEBIT",
          amount: amnt,
        });
        return {
          statusCode: 200,
          status: true,
          message: userDetails[acno]["balance"],
        };
      } else {
        return {
          statusCode: 401,
          status: false,
          message: "Insufficent Balance",
        };
      }
    } else {
      return {
        statusCode: 401,
        status: false,
        message: "Incorrect Password",
      };
    }
  } else {
    return {
      statusCode: 401,
      status: false,
      message: "Incorrect Account number",
    };
  }
};

gettransaction = (acno) => {
  if (acno in userDetails) {
    return {
      statusCode: 200,
      status: true,
      message: userDetails[acno]["transaction"],
    };
  } else {
    return {
      statusCode: 401,
      status: false,
      message: "Incorrect Account number",
    };
  }
};

module.exports = {
  register,
  login,
  deposit,
  withdraw,
  gettransaction,
};
