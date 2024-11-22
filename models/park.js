import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  body: { type: String, required: true },
});

const parkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  camping: { type: Boolean, required: true },
  entranceFee: { type: [Number] },
  closedDates: { type: [Date] },
  favoriteUsers: { type: [Schema.Types.ObjectId], ref: "User" },
  tripsPlanned: { type: [Schema.Types.ObjectId], ref: "Trip" },
  comment: { type: [commentSchema] },
});

const Park = mongoose.model("Park", parkSchema);

export default Park;
