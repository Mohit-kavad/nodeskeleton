const userRoutes = require("./users");
const authRoutes = require("./auth");

module.exports = (app) => {
  userRoutes(app);
  authRoutes(app);
};
