const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authTokenValidator");

const {
	getContentbyTitle,
	getContentbyDate,
	createContent,
	updateContent,
	deleteContent,
} = require("../controllers/contentController");

router.use(verifyToken);
router.route("/recents").get(getContentbyDate); // get the content for a specific date
router.route("/search").post(getContentbyTitle); // get the content for a specific date
router.route("/new").post(createContent); // create content for a specific date
router.route("/:id").put(updateContent); // update content for a specific date
router.route("/:id").delete(deleteContent); // delete content for a specific date

module.exports = router;
