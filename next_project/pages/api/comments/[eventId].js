import { MongoClient } from "mongodb";

async function handler(req, res) {
  const eventId = req.query.eventId;
  const client = await MongoClient.connect(
    "mongodb+srv://prinsvaghasiyait21:Prince832004@cluster0.01ztk.mongodb.net/events?retryWrites=true&w=majority"
  );
  if (req.method === "POST") {
    const { email, text, name } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({
        message: "invalide input",
      });
      return;
    }
    console.log(email, name, text);

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();
    const response = await db.collection("comments").insertOne(newComment);

    console.log(response);
    newComment.id = response.insertedId;

    res.status(201).json({
      message: "new comment created",
      comment: newComment,
    });
  }

  if (req.method === "GET") {
    const db = client.db();
    const comments = await db
      .collection("comments")
      .find()
      .sort({
        _id: -1,
      })
      .toArray();
    res.status(200).json({ comment: comments });
  }
  client.close();
}

export default handler;
