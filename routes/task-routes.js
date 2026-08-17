const express = require("express");
const taskControllers = require("../controllers/task-controllers");
const multerUpload = require("../middleware/multer-middleware");

const router = express.Router();

router
  .route("/")
  .get(taskControllers.getAllTasks)
  .post(multerUpload.single("attachment"), taskControllers.createTask);

router
  .route("/:id")
  .get(taskControllers.getTaskById)
  .patch(multerUpload.single("attachment"), taskControllers.updateTask)
  .delete(taskControllers.deleteTask);

module.exports = router;
