require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const database = require("./config/database");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const sessionRoutes = require("./routes/session");

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin === "http://localhost:3000" || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
};

app.use(cors(corsOptions));

// Handle preflight requests with the same options
// app.options("*", cors(corsOptions));




app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
database.connect();

app.use("/api/v1/auth", authRoutes);
 app.use("/api/v1/session", sessionRoutes);

app.get('/', (req, res) => res.send('Wellness API backend Running'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
