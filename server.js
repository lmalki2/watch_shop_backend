const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* =======================
   MIDDLEWARES
======================= */

// CORS
app.use(cors({
  origin: "*"
}));

// Body parser (base64 images)
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

/* =======================
   MONGODB CONNECTION
======================= */

// 🔑 Railway / Production
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/watch_shop";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

/* =======================
   ROUTES
======================= */
app.use("/api/products", require("./routes/products"));

/* =======================
   TEST ROUTE
======================= */
app.get("/", (req, res) => {
  res.send("✅ Server is running");
});

/* =======================
   SERVER START
======================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
