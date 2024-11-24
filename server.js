import "./db/connection.js";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";

import isSignedIn from "./middleware/is-signed-in.js";
import passUserToView from "./middleware/pass-user-to-view.js";
import authController from "./controllers/auth.js";
import userController from "./controllers/user.js";

dotenv.config();
const app = express();
const port = process.env.PORT ? process.env.PORT : "3000";

app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.render("index.ejs", {
    user: req.session.username,
  });
});

app.use("/auth", authController);
app.use("/user", userController);

app.listen(port, () => {
  console.log(`The express app is ready on http://localhost:${port}`);
});