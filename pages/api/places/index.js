import Places from "../../../db/models/Places.js";

import dbConnect from "../../../db/dbConnect.js";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const places = await Places.find();

    if (!places) {
      return response.status(404).json({ status: "Not Found" });
    }
    response.status(200).json(places);
  }
  if (request.method === "POST") {
    try {
      const placeData = request.body;
      await Places.create(placeData);

      response.status(201).json({ status: "Place created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
