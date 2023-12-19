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

register = (uname, acno, psw) => {
  if (acno in userDetails) {
    return {
      statusCode: 401,
      status: false,
      message: "user already exist",
    };
  } else {
    userDetails[acno] = {
      acno,
      username: uname,
      password: psw,
      balance: 0,
      transaction: [],
    };
    console.log(userDetails);
    return {
      statusCode: 200,
      status: true,
      message: "Registration success",
    };
  }
};
login = (acno, psw) => {
  if (acno in userDetails) {
    if (psw == userDetails[acno]["password"]) {
      return {
        statusCode: 200,
        status: true,
        message: "Login success",
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

module.exports = {
  register,
  login,
};
