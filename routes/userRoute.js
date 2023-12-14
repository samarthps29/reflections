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
router.route("/updatePassword").put(updatePassword); // actually updates the password
router.route("/resetPassword").put(resetPassword); // send mail with reset token in link
router.route("/checkResetToken").post(checkResetToken); // checks if the reset token is valid
router.route("/login").post(userLogin);
router.route("/refresh").post(generateNewToken);
router.route("/logout").get(userLogout);

module.exports = router;
