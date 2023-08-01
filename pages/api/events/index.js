import { pool } from "config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getEvents(req, res);
    case "POST":
      return await saveEvent(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const getEvents = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM event");
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const saveEvent = async (req, res) => {
  try {
    const { titre, datestart, dateend} = req.body;

    const result = await pool.query("INSERT INTO event SET ?", {
      titre,
      datestart,
      dateend,
    });

    return res.status(200).json({ ...req.body, id: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
