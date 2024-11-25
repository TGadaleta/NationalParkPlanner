import "./db/connection.js";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import methodOverride from "method-override"

import isSignedIn from "./middleware/is-signed-in.js";
import passUserToView from "./middleware/pass-user-to-view.js";
import authController from "./controllers/auth.js";
import userController from "./controllers/user.js";
import parksController from "./controllers/parks.js"

dotenv.config();
const app = express();
const port = process.env.PORT ? process.env.PORT : "3000";

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
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
app.use(passUserToView);
app.use(isSignedIn);
app.use("/user", userController);
app.use("/parks", parksController);

app.listen(port, () => {
  console.log(`The express app is ready on http://localhost:${port}`);
});
