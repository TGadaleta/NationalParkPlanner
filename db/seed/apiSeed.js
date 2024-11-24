import "../connection.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import Park from "../../models/park.js";

const seed = async () => {
  try {
    const bulkParks = [];
    const apiKey = process.env.NPS_API;
    const parks = await axios.get(
      `https://developer.nps.gov/api/v1/parks?limit=200&q=%22National%20Park%22&api_key=${apiKey}`
    );
    parks.data.data.forEach((park) => {
      const parkData = {
        name: park.fullName,
        description: park.description,
        designation: park.designation || "",
        states: park.states,
        latLong: park.latLong,
        entranceFee: //ChatGPT
          Array.isArray(park.entranceFees) && park.entranceFees.length > 0
            ? park.entranceFees.map((fee) => fee.cost || 0)
            : ["0.00"],
        image: park.images[0].url,
      };
      bulkParks.push(parkData);
    });

    await Park.insertMany(bulkParks);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

seed();
