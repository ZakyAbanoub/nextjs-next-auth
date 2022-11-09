import { getSession } from "next-auth/client";
import { hashPassword, verifyPassword } from "../../../../lib/auth";
import { connectToDatabase } from "../../../../lib/db";

// /api/user/change-password

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEamil = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email: userEamil });

  if (!user) {
    res.status(400).json({ message: "User not found!" });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: "You have inserted a wrong old password" });
    client.close();
    return;
  }

  const hashedNewPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEamil },
    { $set: { password: hashedNewPassword } }
  );

  if (!result) {
    res.status(500).json({ message: "Please contact the administrator" });
    client.close();
    return;
  }

  client.close();
  res.status(200).json({ message: "Password updated successfully!" });
}

export default handler;
