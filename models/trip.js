import mongoose, { Schema } from "mongoose";

const tripSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true},
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  park: { type: Schema.Types.ObjectId, ref: "Park", required: true },
  cost: { type: Number },
});

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
