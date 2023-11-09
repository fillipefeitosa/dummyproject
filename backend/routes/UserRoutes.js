import express from "express";
import {
  createUser,
  findOneUser,
  findAllUsers,
} from "../controllers/UserController.js";

// Define the routes for the user API
const UserRoutes = express.Router();

// Create a new user
UserRoutes.post("/create", createUser);

// Read users, all and one
UserRoutes.get("/", findAllUsers);
UserRoutes.get("/:id", findOneUser);

export default UserRoutes;
