import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../../lib/db";
import { hashPassword, verifyPassword } from "../../../lib/auth";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }
  const { props } = req.body;

  const session = props.session;

  if (!session) {
    return res.status(401).json({ message: "Not Authenticated!" });
  }
  const userEmail = session.user.email;

  const { oldPassword, newPassword } = req.body.passwordData;

  const client = await connectToDatabase();
  const userCollection = client.db().collection("users");
  const user = await userCollection.findOne({ email: userEmail });

  if (!user) {
    client.close();
    return res.status(404).json({ message: "User not Found" });
  }

  const currentPassword = user.password;

  const passwordAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordAreEqual) {
    client.close();
    return res.status(403).json({
      message: "invalid Password",
    });
  }

  const hashPassword1 = await hashPassword(newPassword);
  const result = await userCollection.updateOne(
    { email: userEmail },
    {
      $set: {
        password: hashPassword1,
      },
    }
  );
  client.close();
  res.status(200).json({
    message: "password update successfully",
  });
}

export default handler;
