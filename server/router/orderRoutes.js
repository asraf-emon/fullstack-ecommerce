import express from "express";
import {
  fetchSingleOrder,
  placeNewOrder,
  fetchMyOrders,
  fetchAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/OrderController.js";
import {
  isAuthenticated,
  authorizedRoles,
} from "../middlewares/authMiddleware.js";

const orderRouter = express.Router();
orderRouter.post("/new", isAuthenticated, placeNewOrder);
orderRouter.get("/:orderId", isAuthenticated, fetchSingleOrder);
orderRouter.get("/orders/me", isAuthenticated, fetchMyOrders);
orderRouter.get(
  "/admin/getall",
  isAuthenticated,
  authorizedRoles("Admin"),
  fetchAllOrders,
);
orderRouter.put(
  "/admin/update/:orderId",
  isAuthenticated,
  authorizedRoles("Admin"),
  updateOrderStatus,
);
orderRouter.delete(
  "/admin/delete/:orderId",
  isAuthenticated,
  authorizedRoles("Admin"),
  deleteOrder,
);

export default orderRouter;
