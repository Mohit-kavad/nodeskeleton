const { message, codes } = require("./../utils/constants");
const { User } = require("./../../models");

// const createUser = async (req, res, next) => {
//   try {
//     const user = await User.create(req.body);

//     return res.status(codes.SUCCESS_CODE).json({
//       status: message.SUCCESS,
//       data: {
//         users: user,
//       },
//     });
//   } catch (error) {
//     return next(error);
//   }
// };

const getAlluser = async (req, res, next) => {
  try {
    const allUser = await User.findAll();

    res.status(codes.SUCCESS_CODE).json({
      status: message.SUCCESS,
      results: allUser.length,
      data: {
        users: allUser,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const findUser = await User.findOne({ where: { id: id } });

    if (!findUser) {
      return res.status(codes.NOT_FOUND_CODE).json({
        message: message.USER_NOT_FOUND,
      });
    } else {
      await User.destroy({ where: { id: id } });
      res.status(codes.SUCCESS_CODE).json({
        status: message.SUCCESS,
        message: message.DELETE_SUCCESS,
      });
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAlluser,
  deleteUser,
};
