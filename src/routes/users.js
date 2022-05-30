const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/auth");

module.exports = (app) => {
  app.get("/users", verifyToken, userController.getAlluser);
  app.delete("/users/:id", userController.deleteUser);
};
