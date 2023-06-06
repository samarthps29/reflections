const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authTokenValidator");

const {
	getContent,
	createContent,
	updateContent,
} = require("../controllers/contentController");

router.use(verifyToken);
router.route("/").post(getContent); // get the content for a specific date
router.route("/new").post(createContent); // create content for a specific date
router.route("/:id").put(updateContent); // update content for a specific data

module.exports = router;
