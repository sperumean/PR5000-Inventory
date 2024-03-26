import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import equipmentRoutes from "./routes/equipment.js";
import userRoutes from "./routes/user.js";
import reservationRoutes from "./routes/reservation.js";
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  next();
});

// Routes
app.use("/api/equipment", equipmentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/reservations", reservationRoutes);

// DB connect
mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to MongoDB. Server running on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });