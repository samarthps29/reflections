const express = require("express");
const router = express.Router();

const {
	userLogin,
	userLogout,
	createUser,
	updatePassword,
	generateNewToken,
} = require("../controllers/userController");

router.route("/new").post(createUser);
router.route("/login").post(userLogin);
router.route("/refresh").post(generateNewToken);
router.route("/updatePassword").put(updatePassword);
router.route("/logout").get(userLogout);

module.exports = router;
