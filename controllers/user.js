import express from "express";
import methodOverride from "method-override";
import bcrypt from "bcrypt"

import User from "../models/user.js";
const router = express.Router();

router.use(methodOverride("_method"));

router.get("/:userId", (req, res) => {
  try {
    res.render("user/index.ejs", { user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).send("There was an error getting your profile");
  }
});

router.get("/:userId/edit", (req, res) => {
  try {
    res.render("user/edit.ejs", { user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).send("There was an error getting the form");
  }
});

router.put("/:userId", async (req, res) => {
  try {

    const userId = req.session?.user?._id;
    if (!userId) {
      return res.status(401).send("Unauthorized: User not logged in");
    }

    const currentUser = await User.findById(userId);

    const validPassword = bcrypt.compareSync(
        req.body.password,
        currentUser.password
    )
    if (!validPassword) {
        return res.send('Old passwords do not match')
    }

    currentUser.email = req.body.email;
    req.session.user.email = currentUser.email
    
    if (req.body.newPassword != '' && req.body.newPassword === req.body.confirmNewPassword){
        const hashedPassword = bcrypt.hashSync(req.body.newPassword, 10);
        currentUser.password = hashedPassword
    }
    await currentUser.save();

    res.redirect(`/user/${userId}`)
  } catch (error) {
    console.error(error);
    res.status(500).send("There was an error updating your user");
  }
});


export default router;
