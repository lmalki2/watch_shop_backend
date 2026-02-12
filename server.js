const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* =======================
   MIDDLEWARES
======================= */

// CORS
app.use(
  cors({
    origin: "*",
  })
);

// Body parser
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

/* =======================
   MONGODB CONNECTION
======================= */

const MONGO_URL =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/watch_shop";

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
   SERVER START (IMPORTANT)
======================= */

const PORT = process.env.PORT || 3000;

mongoose
  .connect(MONGO_URL, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });

/* =======================
   MONGOOSE DEBUG
======================= */

mongoose.connection.on("error", (err) => {
  console.error("🔴 Mongoose runtime error:", err);
});
