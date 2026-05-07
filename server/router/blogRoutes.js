import express from "express";
import {
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  insertBlogToDB,
  updateBlogInDB,
  deleteBlogFromDB,
} from "../models/blogTable.js";

const blogRouter = express.Router();

blogRouter.get("/all", async (req, res) => {
  try {
    const blogs = await getAllBlogsFromDB();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

blogRouter.get("/single/:id", async (req, res) => {
  try {
    const blog = await getSingleBlogFromDB(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the blog" });
  }
});

blogRouter.post("/create", async (req, res) => {
  try {
    const newBlog = await insertBlogToDB(req.body);
    res.status(201).json({ success: true, blog: newBlog });
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog" });
  }
});

blogRouter.put("/update/:id", async (req, res) => {
  try {
    const updatedBlog = await updateBlogInDB(req.params.id, req.body);
    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Blog updated!", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});

blogRouter.delete("/delete/:id", async (req, res) => {
  try {
    const deletedBlog = await deleteBlogFromDB(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
});

export default blogRouter;
