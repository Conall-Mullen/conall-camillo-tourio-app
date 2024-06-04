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
}
