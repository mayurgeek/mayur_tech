import express from "express";
import {task,addTask,updateTask,deleteTask} from "../controllers/taskController.js";

const taskRouter = express.Router();
taskRouter.post("/task",task);
taskRouter.post("/addTask",addTask);
taskRouter.put("/updateTask",updateTask);
taskRouter.patch("/deleteTask",deleteTask);

export default taskRouter;
