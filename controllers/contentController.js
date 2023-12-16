const Content = require("../models/contentModel");
const asyncHandler = require("express-async-handler");

const getContent = asyncHandler(async (req, res) => {
	const { searchParam, searchArg } = req.body;
	if (!searchParam) {
		res.status(400).json({ message: "Empty search parameter" });
	}
	try {
		let content;
		if (searchParam === "title") {
			content = await Content.find({
				userID: req.user.id,
				title: { $regex: new RegExp(searchArg, "i") },
			});
		} else if (searchParam === "date") {
			content = await Content.find({
				userID: req.user.id,
			}).sort({ date: -1 });
		} else if (searchParam === "content") {
			content = await Content.find({
				userID: req.user.id,
				notesContent: { $regex: new RegExp(searchArg, "i") },
			});
		} else if (searchParam === "id") {
			content = await Content.findById(searchArg);
			if (content.userID != req.user.id) {
				res.status(403).json({ message: "Forbidden" });
			}
		} else {
			res.status(400).json({ message: "Invalid search parameter" });
		}
		return res.status(200).json(content);
	} catch (err) {
		console.log("Error");
	}
});

const createContent = asyncHandler(async (req, res) => {
	const { title, date, notesContent } = req.body;
	const createdContent = await Content.create({
		userID: req.user.id,
		title,
		date,
		notesContent,
	});
	res.status(200).json({
		message: "Content created succesfully",
		id: createdContent._id,
	});
});

const updateContent = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const content = await Content.findById(id);
	if (content.userID != req.user.id) {
		res.status(403).json({ message: "Forbidden" });
	}
	const updatedContent = await Content.findByIdAndUpdate(id, req.body, {
		new: true,
	});
	res.status(200).send(updatedContent);
});

const deleteContent = async (req, res) => {
	const id = req.params.id;
	const content = await Content.findById(id);
	if (content.userID != req.user.id) {
		res.status(403).json({ message: "Forbidden" });
	}
	const deletedContent = await Content.findByIdAndRemove(id);
	if (deletedContent) {
		res.status(200).json({ message: "Content removed successfully" });
	} else {
		res.status(500).json({ message: "An error occurred" });
	}
};

module.exports = {
	getContent,
	createContent,
	updateContent,
	deleteContent,
};
