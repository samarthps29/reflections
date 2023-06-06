const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required"],
	},
	userName: {
		type: String,
		required: [true, "User Name is required"],
	},
	email: {
		type: String,
		required: [true, "Email address is required"],
	},
	password: {
		type: String,
		required: [true, "Password is required"],
	},
});

module.exports = mongoose.model("User", userSchema);
