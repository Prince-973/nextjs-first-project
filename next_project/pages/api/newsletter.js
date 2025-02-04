import { connectDateBase, insertDocumnet } from "@/helper/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({
        message: "Invalide email address",
      });
      return;
    }
    let client;
    try {
      client = await connectDateBase();
    } catch (error) {
      return res.status(500).json({
        message: "connecting database failed",
        error: error.message,
      });
    }

    try {
      await insertDocumnet(client, "emails", { email: userEmail });
      client.close();
    } catch (error) {
      return res.status(500).json({
        message: "insering database failed",
        error: error.message,
      });
    }

    res.status(201).json({
      message: "sign up",
    });
  }
}

export default handler;
