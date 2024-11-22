import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  plannedTrips: {
    type: [Schema.Types.ObjectId],
    ref: "Trip",
  },
  favoriteParks: {
    type: [Schema.Types.ObjectId],
    ref: "Park",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
