const { Router } = require("express");
const controllers = require("../controllers/user");
const router = Router();

router
  .get("/users", controllers.getAllUsers)
  .get("/users/:id", controllers.getUserById)
  .post("/users", controllers.createUser)
  .put("/users/:id", controllers.updateUser)
  .delete("/users/:id", controllers.deleteUser);

module.exports = router;
