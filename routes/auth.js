const express = require("express");

const router = express.Router();

const authentication = require("../middleware/authentication");
const { login, register } = require("../controllers/auth");

router.route("/login").post(login);
router.post("/register", register);
module.exports = router;
