require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const database = require("./config/database");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const sessionRoutes = require("./routes/session");

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, // allow cookies to be sent
}));

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
database.connect();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/session", sessionRoutes);

app.get('/', (req, res) => res.send('Wellness API Running'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
