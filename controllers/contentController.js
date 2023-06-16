const Content = require("../models/contentModel");
const asyncHandler = require("express-async-handler");

const getContent = asyncHandler(async (req, res) => {
	const { date } = req.body;
	try {
		let content = [];
		content = await Content.find({ userID: req.user.id, date });
		return res.status(200).json(content);
	} catch (err) {
		console.log("Error");
	}
});

const createContent = asyncHandler(async (req, res) => {
	const { date, notesContent } = req.body;
	const createdContent = await Content.create({
		userID: req.user.id,
		date,
		notesContent,
	});
	res.status(200).json({ message: "Content Created Succesfully" });
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

module.exports = { getContent, createContent, updateContent };
