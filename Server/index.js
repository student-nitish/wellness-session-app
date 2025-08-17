require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const database = require("./config/database");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const sessionRoutes = require("./routes/session");

const allowedOrigins = [
  "https://wellness-session-app-lghj.vercel.app", // frontend on Vercel
  "http://localhost:3000" // local dev
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));



app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
database.connect();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/session", sessionRoutes);

app.get('/', (req, res) => res.send('Wellness API backend Running'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
