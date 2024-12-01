import express from "express";
import methodOverride from "method-override";
import bcrypt from "bcrypt";

import User from "../models/user.js";
import Trip from "../models/trip.js";
import Park from "../models/park.js";
const router = express.Router();

router.use(methodOverride("_method"));

//GET
//get user home page
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const favoriteParks = await User.findById(req.params.userId)
      .select("favoriteParks")
      .populate("favoriteParks");
    const plannedTrips = await Trip.find({ userId }).populate("park");
    res.render("user/index.ejs", {
      favoriteParks: favoriteParks,
      plannedTrips: plannedTrips,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("There was an error getting your profile");
  }
});

//get user edit form
router.get("/:userId/edit", (req, res) => {
  try {
    res.render("user/edit.ejs");
  } catch (error) {
    console.error(error);
    res.status(500).send("There was an error getting the edit form.");
  }
});

//get all user trips
router.get("/:userId/trips", async (req, res) => {
  try {
    const userId = req.params.userId;
    const plannedTrips = await Trip.find({ userId }).populate("park");
    res.render("user/trips.ejs", { plannedTrips });
  } catch (error) {
    console.error(error);
    res.status(500).send("There was an error getting your trips.");
  }
});

//get the form to create a new trip
router.get("/:userId/trips/new", async (req, res) => {
  try {
    const parks = await Park.find({});
    parks.sort((a,b)=> a.name.localeCompare(b.name))
    res.render("user/newTrip.ejs", { parks });
  } catch (error) {
    console.error(error);
    res.status(500).send("There was an error getting the form.");
  }
});

//get form to edit trip
router.get("/:userId/trips/:tripId", async (req, res) => {
  try {
    const parks = await Park.find({});
    parks.sort((a,b)=> a.name.localeCompare(b.name))
    const trip = await Trip.findById(req.params.tripId);
    res.render("user/editTrip.ejs", { parks, trip });
  } catch (error) {
    console.error(error);
    res.status(500).send("There was an error getting your trip.");
  }
});

//POST
router.post("/:userId/trips", async (req, res) => {
  try {
    const userId = req.session?.user?._id;
    if (!userId) {
      return res.status(401).send("Unauthorized: User not logged in.");
    }
    req.body.userId = userId;
    const park = await Park.findById(req.body.park);
    if (!park) {
      return res
        .status(401)
        .send("There was an error finding the park in the database.");
    }
    req.body.cost = Number(park.entranceFee[0]);
    const newTrip = await Trip.create(req.body);
    const currentUser = await User.findById(userId);
    currentUser.plannedTrips.push(newTrip);
    currentUser.save();
    res.redirect(`/user/${userId}/trips`);
  } catch (error) {
    console.error(error);
    res.status(500).send("There was an error creating your trip.");
  }
});

//PUT
//update user information
router.put("/:userId", async (req, res) => {
  try {
    const userId = req.session?.user?._id;
    if (!userId) {
      return res.status(401).send("Unauthorized: User not logged in.");
    }
    const currentUser = await User.findById(userId);

    const validPassword = bcrypt.compareSync(
      req.body.password,
      currentUser.password
    );
    if (!validPassword) {
      return res.send("Old password does not match.");
    }
    currentUser.email = req.body.email;
    req.session.user.email = currentUser.email;
    if (
      req.body.newPassword != "" &&
      req.body.newPassword === req.body.confirmNewPassword
    ) {
      const hashedPassword = bcrypt.hashSync(req.body.newPassword, 10);
      currentUser.password = hashedPassword;
    }
    await currentUser.save();
    res.redirect(`/user/${userId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("There was an error updating your user");
  }
});

//update trip information
router.put("/:userId/trips/:tripId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const trip = await Trip.findByIdAndUpdate(req.params.tripId, req.body);
    await trip.save();
    res.redirect(`/user/${userId}/trips`);
  } catch (error) {
    console.error(error);
    res.status(500).send("There was an error updating your trip.");
  }
});

//DELETE
//Delete Trip
router.delete("/:userId/trips/:tripId", async (req, res) => {
  try {
    const userId = req.params.userId;
    await Trip.findByIdAndDelete(req.params.tripId);
    res.redirect(`/user/${userId}/trips`);
  } catch (error) {
    console.error(error);
    res.status(500).send("There was an error deleting your trip.");
  }
});

export default router;
