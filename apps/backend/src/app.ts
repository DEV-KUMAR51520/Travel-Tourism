import express from "express";
import cors from "cors";
import helmet from "helmet";
import { PrismaClient } from "@prisma/client";
import bookingRouter from "./routes/booking";

const app = express();
const prisma = new PrismaClient();
app.use("/api/bookings", bookingRouter);

app.use(express.json());
app.use(cors());
app.use(helmet());

// Example route
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// Import other routers if defined
import authRouter from "./routes/auth";
import destinationRouter from "./routes/destination";

app.use("/api/auth", authRouter);
app.use("/api/destinations", destinationRouter);

// ✅ Keep the process alive
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🟢 Backend listening on port ${PORT}`);
});
