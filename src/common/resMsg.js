let resMsg = {
    serverError:{statusCode:500,status:false,resMsg:"find internal server error"},
    badRequest:{statusCode:400,status:false,resMsg:"bad request - invalid json"},
    addTaskSuccess:{statusCode:200,status:true,resMsg:"add task successfull"},
    updateTaskSuccess:{statusCode:200,status:true,resMsg:"update operation successfull"},
    oprationField:{statusCode:200,status:true,resMsg:"operation failed..!"},
    deleteTaskSuccess:{statusCode:200,status:true,resMsg:"task delete successfully"},
    getDataList:{statusCode:200,status:true,resMsg:"ok"},
}
export default resMsg ;