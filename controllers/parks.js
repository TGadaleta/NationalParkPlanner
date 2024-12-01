import express from "express";
import Park from "../models/park.js";
import User from "../models/user.js";

const router = express.Router();

//GET
//get list of all parks
router.get("/", async (req, res) => {
  try {
    const allParks = await Park.find({});
    allParks.sort((a,b)=> a.name.localeCompare(b.name))
    res.render("parks/index.ejs", { parks: allParks });
  } catch (error) {
    console.error(error);
    res.status(500).send("There was a problem getting the parks");
  }
});

//get single park
router.get("/:parkId", async (req, res) => {
  try {
    const park = await Park.findById(req.params.parkId);
    res.render("parks/park.ejs", { park: park });
  } catch (error) {
    console.error(error);
    res.status(500).send("There was a problem getting the park.");
  }
});

//POST
//add park to user's favorites
router.post("/:parkId/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    currentUser.favoriteParks.push(req.params.parkId);
    await currentUser.save();
    res.redirect(`/user/${req.params.userId}`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("There was an error adding the park to your favorites.");
  }
});

//DELETE
//delete park from user's favorites
router.delete("/:parkId/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const removeIndex = currentUser.favoriteParks.indexOf(req.params.parkId);
    currentUser.favoriteParks.splice(removeIndex, 1);
    await currentUser.save();
    res.redirect(`/user/${req.params.userId}`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("There was an error deleting the park from your favorites.");
  }
});

export default router;
