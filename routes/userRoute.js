const express = require("express");
const router = express.Router();

const {
	userLogin,
	createUser,
	generateNewToken,
} = require("../controllers/userController");

router.route("/new").post(createUser);
router.route("/login").post(userLogin);
router.route("/refresh").post(generateNewToken);

module.exports = router;
