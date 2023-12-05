const Content = require("../models/contentModel");
const asyncHandler = require("express-async-handler");

const getContentbyTitle = asyncHandler(async (req, res) => {
	const { title } = req.body;
	try {
		let content = [];
		console.log(title);
		content = await Content.find({
			userID: req.user.id,
			title: { $regex: new RegExp(title, "i") },
		});
		return res.status(200).json(content);
	} catch (err) {
		console.log("Error");
	}
});

const getContentbyID = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const content = await Content.findById(id);
	if (content.userID != req.user.id) {
		res.status(403).json({ message: "Forbidden" });
	}
	res.status(200).send(content);
});

const getContentbyDate = asyncHandler(async (req, res) => {
	try {
		content = await Content.find({
			userID: req.user.id,
		}).sort({ date: -1 });
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
		message: "Content Created Succesfully",
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
		res.status(200).json({ message: "Content Removed Successfully" });
	} else {
		res.status(500).json({ message: "An error occurred" });
	}
};

module.exports = {
	getContentbyTitle,
	getContentbyID,
	getContentbyDate,
	createContent,
	updateContent,
	deleteContent,
};
