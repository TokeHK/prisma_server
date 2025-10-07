import express from "express";
import { prisma } from "../lib/prisma.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const names = await prisma.names.findMany();
    res.json(names);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error / GET all names" });
  }
});

router.post("/post", async (req, res) => {
  try {
    const { name, lastname } = req.body;

    if (!name || !lastname) {
      return res.status(400).json({ error: "Name and lastname are required" });
    }

    const newName = await prisma.names.create({
      data: { name, lastname },
    });

    return res.status(201).json(newName);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error / POST" });
  }
});

router.patch("/patch/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname } = req.body;

    const updatedName = await prisma.names.update({
      where: { id },
      data: { name, lastname },
    });

    res.json(updatedName);
  } catch (err: any) {
    console.error(err);
    if (err.code === "P2025") {
      // Prisma error: record not found
      return res.status(404).json({ error: "Name(id) not found" });
    }
    res.status(500).json({ error: "Internal Server Error / PATCH" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.names.delete({ where: { id } });
    res.json({ message: "Deleted successfully" });
  } catch (err: any) {
    console.error(err);
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Name(id) not found" });
    }
    res.status(500).json({ error: "Internal Server Error / DELETE" });
  }
});

export default router;


