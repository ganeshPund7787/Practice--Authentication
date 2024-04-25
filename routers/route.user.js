import express from "express"
import { deleteUser, getProfile, loginUser, logoutUser, resisteruser, updateUser } from "../controllers/controllers.user.js";
import { isAutheticated } from "../controllers/Auth.js";

const routes = express.Router();

routes.post("/register", resisteruser);
routes.post("/login", loginUser);
routes.get("/logout", logoutUser);
routes.get("/profile", isAutheticated, getProfile);
routes.put('/update/:id', isAutheticated, updateUser)
routes.delete('/delete/:id', isAutheticated, deleteUser)

export default routes;