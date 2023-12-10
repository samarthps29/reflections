const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
	return jwt.sign(
		{ id: user.id, userName: user.userName },
		process.env.ACCESS_SECRET_KEY,
		{
			expiresIn: "2d",
		}
	);
};

const generateRefreshToken = (user) => {
	return jwt.sign(
		{ id: user.id, userName: user.userName },
		process.env.REFRESH_SECRET_KEY,
		{
			expiresIn: "14d",
		}
	);
};

const generateNewToken = (req, res) => {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken) res.status(400).json({ message: "Not authenticated" });
	else {
		jwt.verify(
			refreshToken,
			process.env.REFRESH_SECRET_KEY,
			(err, decoded) => {
				if (err) res.status(400).json({ message: "Invalid token" });
				// console.log(decoded);
				const newAccessToken = generateAccessToken(decoded);
				res.status(200).json({
					accessToken: newAccessToken,
				});
			}
		);
	}
};

const userLogin = asyncHandler(async (req, res) => {
	const { userName, email, password } = req.body;
	if ((!userName && !email) || !password) {
		res.status(400).json({ message: "All fields are mandatory" });
	}

	let user;
	if (userName) {
		user = await User.findOne({ userName });
	} else {
		user = await User.findOne({ email });
	}

	if (user) {
		const match = await bcrypt.compare(password, user.password);
		if (match) {
			const accessToken = generateAccessToken(user);
			const refreshToken = generateRefreshToken(user);
			// Sending the refresh token as HTTP only cookie
			const expiresInDays = 14;
			const expirationDate = new Date();
			expirationDate.setDate(expirationDate.getDate() + expiresInDays);
			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				sameSite: "None",
				secure: true,
				expires: expirationDate,
			});
			// Sending the access token as JSON Object
			res.status(200).json({ accessToken });
		} else {
			res.status(403).json({ message: "Incorrect Password" });
		}
	} else {
		res.status(404).json({ message: "No such user found" });
	}
});

const userLogout = asyncHandler(async (req, res) => {
	res.clearCookie("refreshToken");
	res.status(200).json({ message: "User logged out successfully" });
});

const createUser = asyncHandler(async (req, res) => {
	const { name, userName, email, password } = req.body;
	if (!name || !userName || !email || !password) {
		res.status(400).json({ message: "All fields are mandatory" });
	}
	const user_userName = await User.findOne({ userName });
	const user_email = await User.findOne({ email });
	if (user_userName || user_email) {
		res.status(409).json({ message: "User already exists" });
	} else {
		const hashedPassword = await bcrypt.hash(password, 10);
		const createdUser = await User.create({
			name,
			userName,
			email,
			password: hashedPassword,
		});
		if (createdUser) {
			res.status(200).json({ message: "User created succesfully" });
		} else {
			res.status(400).json({ message: "User could not be created" });
		}
	}
});

const updatePassword = asyncHandler(async (req, res) => {
	const { userName, email, oldPassword, newPassword } = req.body;
	if ((!userName && !email) || !oldPassword || !newPassword) {
		res.status(400).json({ message: "All fields are mandatory" });
	}

	let user;
	if (userName) {
		user = await User.findOne({ userName });
	} else {
		user = await User.findOne({ email });
	}

	if (user) {
		const match = await bcrypt.compare(oldPassword, user.password);
		if (match) {
			const updatedPassword = await bcrypt.hash(newPassword, 10);
			const updatedUser = await User.findByIdAndUpdate(
				user.id,
				{ password: updatedPassword },
				{ new: true }
			);
			if (updatedUser) {
				res.status(200).json({
					message: "Password updated successfully",
				});
			} else {
				res.status(400).json({
					message: "Password could not be updated",
				});
			}
		} else {
			res.status(403).json({ message: "Invalid old password" });
		}
	} else {
		res.status(400).json({ message: "User does not exist" });
	}
});

module.exports = {
	userLogin,
	userLogout,
	createUser,
	updatePassword,
	generateNewToken,
};
