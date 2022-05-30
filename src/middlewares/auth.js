const jwt = require("jsonwebtoken");
const { message, codes } = require("./../utils/constants");
const { User } = require("./../../models");

const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  // let check the bearere  is undifined
  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];
    //  console.log(token);
    // verify token
    var decoded = await jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded.user.id);
  } else {
    res.status(codes.UNAUTHORIZED_CODE).json({
      message: "You are not logged in plese login to get access!",
    });
  }

  //    Check if user is still exists
  const freshUser = await User.findByPk(decoded.user.id);
  //   console.log(freshUser);
  if (!freshUser) {
    return res.status(codes.UNAUTHORIZED_CODE).json({
      message: "The user belonging to this token does not longer exist.",
    });
  }
  next();
};

module.exports = {
  verifyToken,
};
