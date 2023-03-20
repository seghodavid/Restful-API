const express = require("express");
const router = express.Router();
const { getAUser, getAllUsers, updateUser, deleteUser } = require("../controllers/user");


router
  .route("/")
  .get(getAllUsers);

router
  .route("/:userId")
  .get(getAUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
