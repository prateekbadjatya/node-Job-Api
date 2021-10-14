const express = require("express");

const router = express.Router();

const authentication = require("../middleware/authentication");
const {
  createJob,
  deleteJob,
  getAllJOb,
  getJob,
  updateJob
} = require("../controllers/jobs");

router
  .route("/")
  .post(createJob)
  .get(getAllJOb);

router
  .route("/:id")
  .get(getJob)
  .patch(updateJob)
  .delete(deleteJob);

module.exports = router;
