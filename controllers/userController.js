const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
	return jwt.sign(
		{ id: user.id, userName: user.userName },
		process.env.ACCESS_SECRET_KEY,
		{
			expiresIn: "1h",
		}
	);
};

const generateRefreshToken = (user) => {
	return jwt.sign(
		{ id: user.id, userName: user.userName },
		process.env.REFRESH_SECRET_KEY,
		{
			expiresIn: "7d",
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
	const { userName, password } = req.body;
	if (!userName || !password) {
		res.status(400).json({ message: "All fields are mandatory" });
	}
	const user = await User.findOne({ userName });
	if (bcrypt.compare(password, user.password)) {
		const accessToken = generateAccessToken(user);
		const refreshToken = generateRefreshToken(user);
		// Sending the refresh token as HTTP only cookie
		const oneWeekInSeconds = 7 * 24 * 60 * 60; // 1 week in seconds
		const expirationDate = new Date(Date.now() + oneWeekInSeconds * 1000); // Calculat expiration date
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			sameSite: "None",
			secure: true,
			expires: expirationDate,
		});
		// Sending the access token as JSON Object
		res.status(200).json({ accessToken });
	} else {
		res.status(404).json({ message: "No such user found" });
	}
});

const userLogout = asyncHandler(async (req, res) => {
	res.clearCookie("refreshToken");
	res.status(200).json({ message: "Cookie Cleared" });
});

const createUser = asyncHandler(async (req, res) => {
	const { name, userName, email, password } = req.body;
	if (!name || !userName || !email || !password) {
		res.status(400).json({ message: "All fields are mandatory" });
	}
	const user_userName = await User.findOne({ userName });
	const user_email = await User.findOne({ email });
	if (user_userName || user_email) {
		res.status(400).json({ message: "User already exists" });
	} else {
		const hashedPassword = await bcrypt.hash(password, 10);
		const createdUser = await User.create({
			name,
			userName,
			email,
			password: hashedPassword,
		});
		res.status(200).json({ message: "User created succesfully" });
	}
});

module.exports = { userLogin, userLogout, createUser, generateNewToken };
