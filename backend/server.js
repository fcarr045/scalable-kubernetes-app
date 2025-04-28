require("dotenv").config();
const Express = require("express");
const { Pool } = require("pg");
const app = Express();
const port = process.env.PORT | 3001;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
});

app.use(Express.json());

app.get("/tasks", async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks");
  res.json(result.rows);
});

app.post("/tasks", async (req, res) => {
  // Check if req.body exists before destructuring
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }
  
  const { title } = req.body;
  
  // Validate that title exists
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  
  const result = await pool.query(
    `INSERT INTO tasks (title)  VALUES ($1) RETURNING *`,
    [title]
  );
  res.json(result.rows[0]);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
