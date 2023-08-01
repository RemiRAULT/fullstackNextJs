import { pool } from "config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getTask(req, res);
    case "DELETE":
      return await deleteEvent(req, res);
    case "PUT":
      return await updateEvent(req, res);
    default:
      return res.status(400).json({ message: "bad request" });
  }
}

const getTask = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM event WHERE id = ?", [
      req.query.id,
    ]);
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    await pool.query("DELETE FROM event WHERE id = ?", [req.query.id]);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    console.log(req.body)
    await pool.query("UPDATE event SET ? WHERE id = ?", [
      req.body,
      req.query.id,
    ]);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
