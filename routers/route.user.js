import express from "express"
import { getProfile, loginUser, logoutUser, resisteruser } from "../controllers/controllers.user.js";
import { isAuthenticated } from "../controllers/Auth.js";

const routes = express.Router();

routes.post("/register", resisteruser);
routes.post("/login", loginUser);
routes.get("/logout", logoutUser);
routes.get("/profile", isAuthenticated, getProfile);


export default routes;