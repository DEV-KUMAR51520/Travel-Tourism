import express from "express";
import cors from "cors";
import authRouter from "./routes/auth";
import destinationRouter from "./routes/destination";
import bookingRouter from "./routes/booking";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Register routes
app.use("/api/auth", authRouter);
app.use("/api/destination", destinationRouter);
app.use("/api/booking", bookingRouter);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
