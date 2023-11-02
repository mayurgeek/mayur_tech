import { queryListen } from "../common/queryListner.js";
import resMsg from "../common/resMsg.js";

// FOR GET TASK LIST
async function task(req, res) {
    try {
        let search = req.body.search.trim();
        let query = "";
        if (search) {
            query = "SELECT * FROM `task_list` WHERE title Like '%" + search + "%'";
        } else {
            query = "SELECT * FROM task_list";
        };

        let response = await queryListen(query)
        let resp = resMsg.getDataList
        resp["response"] = response
        res.status(200).send(resp)
    } catch (error) {
        console.log(error)
        res.status(200).send(resMsg.serverError)
    }
}

// ADD TASK EVENT
async function addTask(req, res) {
    try {
        let title = req.body.title;
        let query = "INSERT INTO `task_list`(`id`, `step`, `title`)SELECT COALESCE( MAX(`id`)+1,1),1,'" + title + "' FROM task_list;";
        let response = await queryListen(query)
        if (response.affectedRows) {
            res.status(200).send(resMsg.addTaskSuccess)
        } else {
            res.status(500).send(resMsg.oprationField)
        }
    } catch (error) {
        console.log(error)
        res.status(200).send(resMsg.serverError)
    }
}

// UPDATE TASK EVENT
async function updateTask(req, res) {
    try {
        let { updatedStep, id } = req.body
        let query = "";
        if (updatedStep == "rigth") {
            query = "UPDATE task_list SET step = (CASE WHEN step < 4 THEN step + 1 ELSE step END) WHERE id = " + id + "";
        } else if (updatedStep == "left") {
            query = "UPDATE task_list SET step = (CASE WHEN step > 1 THEN step - 1 ELSE step END) WHERE id = " + id + "";
        } else {
            res.status(400).send(resMsg.badRequest)
        }
        let response = await queryListen(query)
        if (response.changedRows) {
            res.status(200).send(resMsg.updateTaskSuccess)
        } else {
            res.status(500).send(resMsg.serverError)
        }
    } catch (error) {
        console.log(error)
        res.status(200).send(resMsg.serverError)
    }
}

// FOR DELETE EVENT
async function deleteTask(req, res) {
    try {
        let id = req.body.id
        let query = "DELETE FROM `task_list` WHERE id = '" + id + "'";
        let response = await queryListen(query)
        if (response.affectedRows) {
            res.status(200).send(resMsg.deleteTaskSuccess)
        } else {
            res.status(500).send(resMsg.serverError)
        }
    } catch (error) {
        console.log(error)
        res.status(200).send(resMsg.serverError)
    }
}

export { task, addTask, updateTask, deleteTask };