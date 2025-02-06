import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(500).json({
      message: "Invalid request method",
    });
  }
  const data = req.body;
  const { email, password } = data;
  if (
    !email ||
    !password ||
    !email.includes("@") ||
    password.trim().length < 7
  ) {
    return res.status(442).json({
      message:
        "Invalid email or password (password should be atleast 7 characters long)",
    });
  }
  const client = await connectToDatabase();

  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    client.close();
    return res.status(442).json({
      message: "User already exists",
    });
  }

  const hashPassword1 = await hashPassword(password);
  await db.collection("users").insertOne({
    email,
    password: hashPassword1,
  });

  res.status(201).json({
    message: "User created successfully",
  });
  client.close();
}

export default handler;
