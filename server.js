const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

// connecting to mongoDB
connectDB();

// middlewares
app.use(cookieParser());
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
	res.setHeader("Access-Control-Allow-Credentials", "true");
	next();
});

app.use(
	cors({
		origin: [process.env.FRONTEND_URL],
		withCredentials: true,
	})
);
app.use(express.json());

// setting routes
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/content", require("./routes/contentRoute"));
app.use("*", require("./utility/handleRouteNotFound"));

// starting the server
app.listen(process.env.PORT);
