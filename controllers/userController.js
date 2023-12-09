const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

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
			expiresIn: "1d",
		}
	);
};

const generateNewToken = (req, res) => {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken) res.status(400).json({ message: "Not authenticated" });
	else if (!refreshTokens.includes(refreshToken))
		res.status(400).json({ message: "Refresh token is not valid" });
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
	if (user) {
		// TODO: need to check if user does not exists and is null
		const match = await bcrypt.compare(password, user.password);
		if (match) {
			const accessToken = generateAccessToken(user);
			const refreshToken = generateRefreshToken(user);
			// Sending the refresh token as HTTP only cookie
			refreshTokens.push(refreshToken);
			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				sameSite: "None",
				secure: true,
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
