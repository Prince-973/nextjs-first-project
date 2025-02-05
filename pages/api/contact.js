import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      !message ||
      name.trim() === "" ||
      message.trim() === ""
    ) {
      return res.status(422).json({
        message: "Inavalid input.",
      });
    }
    const newMessage = {
      email,
      name,
      message,
    };

    let client;
    try {
      client = await MongoClient.connect(
        "mongodb+srv://prinsvaghasiyait21:Prince832004@cluster0.01ztk.mongodb.net/my-site/?retryWrites=true&w=majority"
      );
    } catch (error) {
      return res.status(500).json({
        message: "Could not connect to databse",
      });
    }

    const db = client.db("my-site");
    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      return res.status(500).json({
        message: "Could not send message.",
      });
    }
    client.close();
    res.status(201).json({
      message: "Message sent successfully.",
      messageData: newMessage,
    });
  }
}

export default handler;
