const mongoose = require("mongoose");
const contentSchema = mongoose.Schema({
	userID: {
		type: mongoose.Schema.Types.ObjectId,
		required: [true, "User ID is required"],
		ref: "User",
	},
	title: {
		type: String,
		required: [true, "title is required"],
	},
	date: {
		type: mongoose.Schema.Types.Date,
		required: [false],
	},
	notesContent: {
		type: String,
		required: false,
	},
});

module.exports = mongoose.model("Content", contentSchema);
