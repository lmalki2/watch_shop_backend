const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* =======================
   MIDDLEWARES
======================= */
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

/* =======================
   MONGODB CONNECTION
======================= */
if (!process.env.MONGO_URL) {
  console.error("❌ MONGO_URL is missing");
  process.exit(1); // يطيّح السيرفر إلى ما كانتش variable
}

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

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
