const mongoose = require("mongoose");
const contentSchema = mongoose.Schema({
	userID: {
		type: mongoose.Schema.Types.ObjectId,
		required: [true, "User ID is required"],
		ref: "User",
	},
	date: {
		type: mongoose.Schema.Types.Date,
		required: [true, "Date is required"],
	},
	notesContent: {
		type: String,
		required: false,
	},
});

module.exports = mongoose.model("Content", contentSchema);
