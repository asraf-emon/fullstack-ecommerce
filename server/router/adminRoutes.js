import express from "express";
import {
  dashboardStats,
  deleteUser,
  getAllUsers,
} from "../controllers/adminController.js";
import {
  authorizedRoles,
  isAuthenticated,
} from "./../middlewares/authMiddleware.js";

const adminRouter = express.Router();

adminRouter.get(
  "/getallusers",
  isAuthenticated,
  authorizedRoles("Admin"),
  getAllUsers,
); // Dashboard

adminRouter.delete(
  "/delete/:id",
  isAuthenticated,
  authorizedRoles("Admin"),
  deleteUser,
);

adminRouter.get(
  "/fetch/dashboard-stats",
  isAuthenticated,
  authorizedRoles("Admin"),
  dashboardStats,
);

export default adminRouter;
