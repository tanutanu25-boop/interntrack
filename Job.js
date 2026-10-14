
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      maxlength: 100,
    },

    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: 100,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    mode: {
      type: String,
      enum: ["Remote", "Hybrid", "On-site"],
      default: "Remote",
    },

    type: {
      type: String,
      enum: ["Internship", "Full-time", "Part-time"],
      default: "Internship",
    },

    stipend: {
      type: String,
      default: "Not specified",
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    applyUrl: {
      type: String,
      default: "",
    },

    deadline: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
