
import express from "express";
import mongoose from "mongoose";
import Job from "../models/Job.js";

const router = express.Router();

// CREATE: Add a job
router.post("/", async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      mode,
      type,
      stipend,
      description,
      skills,
      applyUrl,
      deadline,
    } = req.body;

    if (!title?.trim() || !company?.trim() ||
        !location?.trim() || !description?.trim()) {
      return res.status(400).json({
        message: "Title, company, location and description are required",
      });
    }

    const job = await Job.create({
      title,
      company,
      location,
      mode,
      type,
      stipend,
      description,
      skills,
      applyUrl,
      deadline: deadline || null,
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ: Get all jobs with search and filters
router.get("/", async (req, res) => {
  try {
    const { search, mode, type, location } = req.query;
    const filter = {};

    if (search?.trim()) {
      const safeSearch = search.trim().replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      filter.$or = [
        { title: { $regex: safeSearch, $options: "i" } },
        { company: { $regex: safeSearch, $options: "i" } },
        { skills: { $regex: safeSearch, $options: "i" } },
      ];
    }

    if (mode && ["Remote", "Hybrid", "On-site"].includes(mode)) {
      filter.mode = mode;
    }

    if (
      type &&
      ["Internship", "Full-time", "Part-time"].includes(type)
    ) {
      filter.type = type;
    }

    if (location?.trim()) {
      filter.location = {
        $regex: location.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        $options: "i",
      };
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 });

    res.json({
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

// READ: Get one job by ID
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ job });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch job" });
  }
});

// UPDATE: Edit a job
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    const allowedFields = [
      "title",
      "company",
      "location",
      "mode",
      "type",
      "stipend",
      "description",
      "skills",
      "applyUrl",
      "deadline",
    ];

    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([key]) =>
        allowedFields.includes(key)
      )
    );

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Remove a job
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete job" });
  }
});

export default router;
