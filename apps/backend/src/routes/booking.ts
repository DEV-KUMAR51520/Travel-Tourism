import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { authenticate, requireRole, AuthRequest } from "../middleware/auth";

const prisma = new PrismaClient();
const router = Router();

// Validation schema
const bookingSchema = z.object({
  destinationId: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  totalPrice: z.number(),
});

// ✅ Create booking (User)
router.post("/", authenticate, async (req: AuthRequest, res) => {
  try {
    const data = bookingSchema.parse(req.body);
    const booking = await prisma.booking.create({
      data: {
        ...data,
        userId: req.user!.id,
      },
      include: { destination: true },
    });
    res.status(201).json(booking);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: err.message || "Invalid booking" });
  }
});

// ✅ Get all bookings for logged-in user
router.get("/me", authenticate, async (req: AuthRequest, res) => {
  const bookings = await prisma.booking.findMany({
    where: { userId: req.user!.id },
    include: { destination: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(bookings);
});

// ✅ Admin: get all bookings
router.get("/", authenticate, requireRole("ADMIN"), async (_req, res) => {
  const bookings = await prisma.booking.findMany({
    include: { user: true, destination: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(bookings);
});

// ✅ Admin: update booking status
router.put("/:id/status", authenticate, requireRole("ADMIN"), async (req, res) => {
  const { status } = req.body;
  const id = Number(req.params.id);
  try {
    const updated = await prisma.booking.update({
      where: { id },
      data: { status },
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update booking" });
  }
});

// ✅ Cancel booking (User)
router.delete("/:id", authenticate, async (req: AuthRequest, res) => {
  const id = Number(req.params.id);
  try {
    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking || booking.userId !== req.user!.id)
      return res.status(403).json({ error: "Not allowed" });

    await prisma.booking.update({ where: { id }, data: { status: "CANCELLED" } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to cancel booking" });
  }
});

export default router;
