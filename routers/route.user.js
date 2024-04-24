import express from "express"
import { deleteUser, getProfile, loginUser, logoutUser, resisteruser, updateUser } from "../controllers/controllers.user.js";
import { isAuthenticated } from "../controllers/Auth.js";

const routes = express.Router();

routes.post("/register", resisteruser);
routes.post("/login", loginUser);
routes.get("/logout", logoutUser);
routes.get("/profile", isAuthenticated, getProfile);
routes.put('/update/:id', isAuthenticated, updateUser)
routes.delete('/delete/:id', isAuthenticated, deleteUser)

export default routes;