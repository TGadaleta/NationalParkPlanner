import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  body: { type: String, required: true },
});

const parkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  designation: { type: String },
  states: { type: String, required: true },
  latLong: { type: String },
  entranceFee: { type: [String] },
  favoriteUsers: { type: [Schema.Types.ObjectId], ref: "User" },
  tripsPlanned: { type: [Schema.Types.ObjectId], ref: "Trip" },
  comment: { type: [commentSchema] },
});

const Park = mongoose.model("Park", parkSchema);

export default Park;
