import Places from "../../../../db/models/Places.js";
import dbConnect from "../../../../db/dbConnect.js";
import Comment from "../../../../db/models/Comments.js";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const places = await Places.findById(id).populate("comments");

    if (!places) {
      return response.status(404).json({ status: "Not Found" });
    }
    response.status(200).json({ place: places });
  }

  if (request.method === "POST") {
    // const comments = await Comment.findById(id);

    // if (!comments) {
    //   return response.status(404).json({ status: "Not Found" });
    // }
    // response.status(200).json({ comments });
    try {
      const commentData = request.body;
      const createdComment = await Comment.create(commentData);

      console.log("comment", commentData);

      await Places.findByIdAndUpdate(id, {
        $push: { comments: createdComment._id },
      });

      response.status(201).json({ status: "Comment created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
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
