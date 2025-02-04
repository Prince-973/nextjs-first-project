import {
  connectDateBase,
  getAllDocuments,
  insertDocumnet,
} from "@/helper/db-util";
import { MongoClient } from "mongodb";

async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;
  try {
    client = await connectDateBase();
  } catch (error) {
    return res.status(500).json({
      message: "connecting database failed",
      error: error.message,
    });
  }
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
    // console.log(email, name, text);

    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    let response;
    try {
      response = await insertDocumnet(client, "comments", newComment);

      newComment._id = response.insertedId;
    } catch (error) {
      return res.status(500).json({
        message: "instering database failed",
        error: error.message,
      });
    }

    // console.log(response);

    res.status(201).json({
      message: "new comment created",
      comment: newComment,
    });
  }

  if (req.method === "GET") {
    let document;
    try {
      document = await getAllDocuments(client, "comments");
    } catch (error) {
      return res.status(500).json({
        message: "error getting data",
        error: error.message,
      });
    }
    res.status(200).json({ comment: document });
  }
  client.close();
}

export default handler;
