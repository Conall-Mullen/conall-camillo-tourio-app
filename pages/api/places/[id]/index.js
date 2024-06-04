import Places from "../../../../db/models/Places.js";
import dbConnect from "../../../../db/dbConnect.js";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const places = await Places.findById(id);
    if (!places) {
      return response.status(404).json({ status: "Not Found" });
    }
    response.status(200).json({ place: places });
  }

  if (request.method === "DELETE") {
    await Places.findByIdAndDelete(id);

    response.status(200).json({ message: "success" });
  }
  if (request.method === "PATCH") {
    await Places.findByIdAndUpdate(id, {
      $set: request.body,
    });

    response.status(200).json({ status: `Place ${id} updated!` });
  }
}
