import express from "express";
import { createUser } from "../controllers/UserController.js";

// Define the routes for the user API
const UserRoutes = express.Router();

UserRoutes.post("/create", createUser);

export default UserRoutes;
