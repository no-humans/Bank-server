const db = require("./db");
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

login = (acno, psw) => {
  return db.User.findOne({ acno, password: psw }).then((user) => {
    if (user) {
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
        message: "Incorrect account number or password",
      };
    }
  });
};

deposit = async (acno, password, amount) => {
  try {
    var amnt = parseInt(amount);
    var user = await db.User.findOne({ acno, password });

    if (user) {
      user.balance += amnt;
      user.transaction.push({ type: "CREDIT", amount: amnt });
      await user.save();

      return {
        statusCode: 200,
        status: true,
        message: `${user.balance}`,
      };
    } else {
      return {
        statusCode: 401,
        status: false,
        message: "Incorrect password or account number",
      };
    }
  } catch (error) {
    // Handle any unexpected errors here
    console.error("An error occurred during deposit:", error);
    return {
      statusCode: 500,
      status: false,
      message: "Internal Server Error",
    };
  }
};

withdraw = async (acno, password, amount) => {
  try {
    var amnt = parseInt(amount);
    var user = await db.User.findOne({ acno, password });
    if (user) {
      if (amnt > user.balance) {
        return {
          statusCode: 401,
          status: false,
          message: "Insufficent Balance",
        };
      } else {
        user.balance -= amnt;
        user.transaction.push({ type: "DEBIT", amount: amnt });
        user.save();
        return {
          statusCode: 200,
          status: true,
          message: user.balance,
        };
      }
    } else {
      return {
        statusCode: 401,
        status: false,
        message: "Incorrect Password or account number",
      };
    }
  } catch (error) {
    console.error("An error occured during withdraw:", error);
    return {
      statusCode: 500,
      status: false,
      message: "Internal server error",
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
