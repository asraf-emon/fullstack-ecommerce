import express from "express";
import { getAllJobsFromDB, insertJobToDB } from "../models/jobPostTable.js";
import { saveApplicationToDB } from "../models/jobApplicationTable.js"; // New Import

const jobRouter = express.Router();

/**
 * @route   GET /api/v1/jobs/all
 * @desc    Fetch all active job posts from the database
 * @access  Public
 */
jobRouter.get("/all", async (req, res) => {
  try {
    const jobs = await getAllJobsFromDB();
    res.status(200).json(jobs);
  } catch (error) {
    console.error("❌ Error In GET /all:", error.message);
    res.status(500).json({
      error: "Failed to fetch job data from the server.",
    });
  }
});

/**
 * @route   POST /api/v1/jobs/create
 * @desc    Create a new job circular/post
 * @access  Admin (Production)
 */
jobRouter.post("/create", async (req, res) => {
  const { title, category, location, job_type, experience, description } =
    req.body;

  if (!title || !category || !location || !job_type) {
    return res.status(400).json({
      error:
        "Please provide all required fields (Title, Category, Location, Type).",
    });
  }

  try {
    const newJob = await insertJobToDB({
      title,
      category,
      location,
      job_type,
      experience,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Job Posted Successfully!",
      job: newJob,
    });
  } catch (error) {
    console.error("❌ Error In POST /create:", error.message);
    res.status(500).json({
      error: "Could not save the job post to the database.",
    });
  }
});

/**
 * @route   POST /api/v1/jobs/apply
 * @desc    Submit a new job application
 * @access  Public
 */
jobRouter.post("/apply", async (req, res) => {
  const { job_id, full_name, email, resume_link, cover_letter } = req.body;

  // Validation for application fields
  if (!job_id || !full_name || !email || !resume_link) {
    return res.status(400).json({
      error:
        "Please provide all required fields (Job ID, Name, Email, Resume Link).",
    });
  }

  try {
    const newApplication = await saveApplicationToDB({
      job_id,
      full_name,
      email,
      resume_link,
      cover_letter,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully!",
      application: newApplication,
    });
  } catch (error) {
    console.error("❌ Error In POST /apply:", error.message);
    res.status(500).json({
      error: "Failed to submit application. Please try again.",
    });
  }
});

export default jobRouter;
