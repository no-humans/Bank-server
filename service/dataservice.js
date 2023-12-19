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

// login

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

// Deposit

deposit = (acno, password, amount) => {
  var amnt = parseInt(amount);
  if (acno in userDetails) {
    if (password == userDetails[acno]["password"]) {
      userDetails[acno]["balance"] += amnt;
      userDetails[acno]["transaction"].push({ type: "CREDIT", amount: amnt });
      return {
        statusCode:200,
        status:true,
        message:userDetails[acno]["balance"]
      }
    } else {
      return {
        statusCode:401,
        status:false,
        message:'Incorrect password'
      };
    }
  } else {
    return {
      statusCode:401,
      status:false,
      message:"incorrect acccount number"
    };
  }
};

// withdraw

withdraw=(acno, password, amount)=> {
  var amnt = parseInt(amount);
  if (acno in userDetails) {
    if (password == userDetails[acno]['password']) {
      if (amnt <= userDetails[acno]['balance']) {
        userDetails[acno]['balance'] -= amnt;
        userDetails[acno]['transaction'].push({
          type: 'DEBIT',
          amount: amnt,
        });
        return {
          statusCode:200,
          status:true,
          message:userDetails[acno]['balance']
        };
      } else {
        return {
          statusCode:401,
          status:false,
          message:'Insufficent Balance'
        };
      }
    } else {
      
      return{
        statusCode:401,
        status:false,
        message:"Incorrect Password"
      }
    }
  } else {
    return {
      statusCode:401,
      status:false,
      message:'Incorrect Account number'
    };
  }
}

module.exports = {
  register,
  login,
  deposit,
  withdraw
};
