const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authTokenValidator");

const {
	getContentbyTitle,
	getContentbyID,
	getContentbyDate,
	createContent,
	updateContent,
	deleteContent,
} = require("../controllers/contentController");

router.use(verifyToken);
router.route("/recents").get(getContentbyDate); // get all the content sorted by date
router.route("/search/:id").get(getContentbyID); // get a specific note with given id
router.route("/search").post(getContentbyTitle); // get the content for a specific title
router.route("/new").post(createContent); // create content for a specific date
router.route("/:id").put(updateContent); // update content for a specific date
router.route("/:id").delete(deleteContent); // delete content for a specific date

module.exports = router;
