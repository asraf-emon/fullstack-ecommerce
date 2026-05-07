import { createUserTable } from "../models/userTable.js";
import { createOrderItemTable } from "../models/orderItemsTable.js";
import { createOrdersTable } from "../models/ordersTable.js";
import { createPaymentsTable } from "../models/paymentsTable.js";
import { createProductReviewsTable } from "../models/productReviewsTable.js";
import { createProductsTable } from "../models/productsTable.js";
import { createShippingInfoTable } from "../models/shippinginfoTable.js";
import { createContactTable } from "../models/contactTable.js";
import { createJobTable } from "../models/jobPostTable.js";
import { createJobApplicationTable } from "../models/jobApplicationTable.js";
import { createBlogTable } from "../models/blogTable.js";

export const createTables = async () => {
  try {
    await createUserTable();
    await createProductsTable();
    await createProductReviewsTable();
    await createOrdersTable();
    await createOrderItemTable();
    await createShippingInfoTable();
    await createPaymentsTable();
    await createContactTable();
    await createJobTable();
    await createJobApplicationTable();
    await createBlogTable();

    console.log("All tables created successfully.");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};
