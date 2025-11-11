// apps/backend/src/routes/destination.ts
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { authenticate, requireRole, AuthRequest } from "../middleware/auth";

const prisma = new PrismaClient();
const router = Router();

/** Schemas */
const createSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(1),
  description: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional()
});
const updateSchema = createSchema.partial();

/** Public: get list */
router.get("/", async (req, res) => {
  try {
    const destinations = await prisma.destination.findMany({ orderBy: { createdAt: "desc" } });
    res.json(destinations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch destinations" });
  }
});

/** Public: single */
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const dest = await prisma.destination.findUnique({ where: { id } });
    if (!dest) return res.status(404).json({ error: "Not found" });
    res.json(dest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch destination" });
  }
});

/** Admin: create */
router.post("/", authenticate, requireRole("ADMIN"), async (req: AuthRequest, res) => {
  try {
    const data = createSchema.parse(req.body);
    // ensure slug unique (prisma will throw but nicer to check)
    const exists = await prisma.destination.findUnique({ where: { slug: data.slug } });
    if (exists) return res.status(400).json({ error: "Slug already exists" });

    const created = await prisma.destination.create({ data });
    res.status(201).json(created);
  } catch (err: any) {
    console.error(err);
    if (err?.issues) return res.status(400).json({ error: "Validation error", details: err.issues });
    res.status(500).json({ error: "Failed to create destination" });
  }
});

/** Admin: update */
router.put("/:id", authenticate, requireRole("ADMIN"), async (req: AuthRequest, res) => {
  try {
    const id = Number(req.params.id);
    const data = updateSchema.parse(req.body);
    const updated = await prisma.destination.update({ where: { id }, data });
    res.json(updated);
  } catch (err: any) {
    console.error(err);
    if (err?.code === "P2025") return res.status(404).json({ error: "Not found" });
    if (err?.issues) return res.status(400).json({ error: "Validation error", details: err.issues });
    res.status(500).json({ error: "Failed to update destination" });
  }
});

/** Admin: delete */
router.delete("/:id", authenticate, requireRole("ADMIN"), async (req: AuthRequest, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.destination.delete({ where: { id } });
    res.status(204).send();
  } catch (err: any) {
    console.error(err);
    if (err?.code === "P2025") return res.status(404).json({ error: "Not found" });
    res.status(500).json({ error: "Failed to delete destination" });
  }
});

export default router;
