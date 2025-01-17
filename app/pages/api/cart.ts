import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const designData = req.body;

    try {
      // Save designData to your database (MongoDB, Firebase, etc.)
      console.log("Saving to database:", designData);
      res.status(200).json({ message: "Design saved successfully!" });
    } catch (error) {
      console.error("Error saving design:", error);
      res.status(500).json({ error: "Failed to save design." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
