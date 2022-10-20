const { Router } = require("express");
const controllers = require("../controllers/user");
const router = Router();
const upload = require("../middlewares/upload");

router
  .get("/users", controllers.getAllUsers)
  .get("/users/:id", controllers.getUserById)
  .post("/users", controllers.createUser)
  .post("/users/uploadUser", upload.single("file"), controllers.uploaduser)
  .put("/users/:id", controllers.updateUser)
  .delete("/users/:id", controllers.deleteUser)
  .post("/users/deleteUsers", controllers.deleteUsers)
  .post("/users/deleteAll", controllers.deleteAllUser);

module.exports = router;
