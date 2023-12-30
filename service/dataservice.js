const db = require("./db");
const jwt = require("jsonwebtoken");

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
        currentAcno: acno,
        currentUser: user.username,
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

gettransaction = async (acno) => {
  try {
    var user = await db.User.findOne({ acno });
    if (user) {
      return {
        statusCode: 200,
        status: true,
        message: user.transaction,
      };
    } else {
      return {
        statusCode: 401,
        status: false,
        message: "Incorrect Account number",
      };
    }
  } catch (error) {
    console.error("An error occured during fetching transaction;", error);
    return {
      statusCode: 500,
      status: false,
      message: "Internal server error",
    };
  }
};
acdelete=(acno)=>{
  return db.User.deleteOne({acno}).then((user)=>{
    if(user){
      return {
        statusCode: 200,
        status: true,
        message: 'Account deleted',
      }
    }
    else{
      return{
        statusCode:401,
        status:false,
        message:'Incorrect account number'
      }
    }
  })
}

module.exports = {
  register,
  login,
  deposit,
  withdraw,
  gettransaction,
  acdelete
};
