const express = require("express");
const session = require("express-session");
const nodemailer = require("nodemailer");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();
const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:8081",
  "http://localhost:4173"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || "supersecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "Portfolio"
});

// ------------------ AUTH ------------------

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const adminUser = process.env.ADMIN_USERNAME;
  const adminPass = process.env.ADMIN_PASSWORD;

  if (username === adminUser && password === adminPass) {
    req.session.user = username;
    return res.sendStatus(200);
  }

  console.log("ENV USER:", process.env.ADMIN_USERNAME);
  console.log("ENV PASS:", process.env.ADMIN_PASSWORD);


  return res.status(401).json({ message: "Invalid credentials" });
});

app.get("/api/check-auth", (req, res) => {
  if (req.session.user === process.env.ADMIN_USERNAME) {
    return res.json({ authenticated: true });
  }
  res.status(401).json({ authenticated: false });
});

app.post("/api/logout", (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
});

const authMiddleware = (req, res, next) => {
  if (req.session.user === process.env.ADMIN_USERNAME) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// ------------------ CONTACT FORM ------------------

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.TO_EMAIL,
    replyTo: email,
    subject: `Message from Portfolio Contact Form`,
    html: `
      <h3>New message from your portfolio website:</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

// ------------------ PROJECT CRUD (protected) ------------------

app.get("/api/projects", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM projects ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/projects", authMiddleware, async (req, res) => {
  const { title, description, image, technologies, liveUrl, githubUrl, featured } = req.body;
  try {
    await pool.query(
      "INSERT INTO projects (title, description, image, technologies, liveUrl, githubUrl, featured) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, description, image, JSON.stringify(technologies), liveUrl, githubUrl, featured]
    );
    res.status(201).json({ message: "Project created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/projects/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, description, image, technologies, liveUrl, githubUrl, featured } = req.body;
  try {
    await pool.query(
      "UPDATE projects SET title=?, description=?, image=?, technologies=?, liveUrl=?, githubUrl=?, featured=? WHERE id=?",
      [title, description, image, JSON.stringify(technologies), liveUrl, githubUrl, featured, id]
    );
    res.json({ message: "Project updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/projects/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM projects WHERE id = ?", [id]);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------ SKILL CRUD (protected) ------------------

app.get("/api/skills", authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM skills ORDER BY id DESC");
    res.json(rows);
    // res.send(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/api/skills_", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM skills ORDER BY id DESC");
    res.json(rows);
    // res.send(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/skills", authMiddleware, async (req, res) => {
  const { name } = req.body; // e.g., level = "Expert", "Intermediate"
  try {
    await pool.query(
      "INSERT INTO skills (name) VALUES (?)",
      [name]
    );
    res.status(201).json({ message: "Skill added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/skills/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await pool.query(
      "UPDATE skills SET name=? WHERE id=?",
      [name, id]
    );
    res.json({ message: "Skill updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/skills/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM skills WHERE id = ?", [id]);
    res.json({ message: "Skill deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ------------------ SERVER ------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
