const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authTokenValidator");

const {
	getContent,
	createContent,
	updateContent,
	deleteContent,
} = require("../controllers/contentController");

router.use(verifyToken);
router.route("/search").post(getContent); // get the content for a specific title
router.route("/new").post(createContent); // create content for a specific date
router.route("/:id").put(updateContent); // update content for a specific date
router.route("/:id").delete(deleteContent); // delete content for a specific date

module.exports = router;
