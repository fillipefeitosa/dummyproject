import express from "express";
import {
  createUser,
  findOneUser,
  findAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/UserController.js";

// Define the routes for the user API
const UserRoutes = express.Router();

// Create a new user
UserRoutes.post("/create", createUser);

// Read users, all and one
UserRoutes.get("/", findAllUsers);
UserRoutes.get("/:id", findOneUser);

// Update a user
UserRoutes.patch("/:id", updateUser);

// Delete a user
UserRoutes.delete("/:id", deleteUser);

export default UserRoutes;
