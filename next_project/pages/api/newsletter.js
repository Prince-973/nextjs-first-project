import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({
        message: "Invalide email address",
      });
      return;
    }
    const client = await MongoClient.connect(
      "mongodb+srv://prinsvaghasiyait21:Prince832004@cluster0.01ztk.mongodb.net/events?retryWrites=true&w=majority"
    );
    const db = client.db();
    await db.collection("emails").insertOne({
      email: userEmail,
    });
    client.close();
    res.status(201).json({
      message: "sign up",
    });
  }
}

export default handler;
