import { queryListen } from "../common/queryListner.js";
import resMsg from "../common/resMsg.js";

// FOR GET TASK LIST
 async function task(req,res) {
    let search = req.body.search.trim();
    let query ="";
    if(search){
         query = "SELECT * FROM `task_list` WHERE title Like '%"+search+"%'";
    }else{
         query = "SELECT * FROM task_list";
    };
   let response = await queryListen(query)
   resMsg.getDataList.response=response
   res.status(200).send(resMsg)
}

// ADD TASK EVENT
 async function addTask(req,res) {
    let title = req.body.title;
    let query = "INSERT INTO `task_list`(`id`, `step`, `title`)SELECT COALESCE( MAX(`id`)+1,1),1,'"+title+"' FROM task_list;";
   let response = await queryListen(query)
   if(response.inserted){
    res.status(200).send(resMsg.addTaskSuccess)
   }else{
    res.status(500).send(resMsg.oprationField)
   }
}

// UPDATE TASK EVENT
 async function updateTask(req,res) {
    let updatedStep = req.body.updatedStep
    if(updatedStep=="rigth"){
        query = "UPDATE task_list SET step = (CASE WHEN step < 4 THEN step + 1 ELSE step END) WHERE id = 1";
    }else if(updatedStep=="left"){
        query = "UPDATE task_list SET step = (CASE WHEN step > 1 THEN step - 1 ELSE step END) WHERE id = 1";
    }else{
        res.status(400).send(resMsg.badRequest)
    }
   let response = await queryListen(query)
   if(response.affected){
    res.status(200).send(resMsg.updateTaskSuccess)
}else{
    res.status(500).send(resMsg.serverError)
}  
}

// FOR DELETE EVENT
 async function deleteTask(req,res) {
    let id = req.body.id
    let query = "DELETE FROM `task_list` WHERE id = '"+id+"'";
   let response = await queryListen(query)
   if(response.affected){
    res.status(200).send(resMsg.deleteTaskSuccess)
}else{
    res.status(500).send(resMsg.serverError)
}
}

export {task,addTask,updateTask,deleteTask};