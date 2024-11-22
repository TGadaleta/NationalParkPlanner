import mongoose, { Schema } from "mongoose";

const tripSchema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  parks: { type: [Schema.Types.ObjectId], ref: "Trip", required: true },
  parkDates: { type: [Date], required: true },
  cost: { type: Number },
});

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
