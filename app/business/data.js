/**
 * Created with JetBrains WebStorm.
 * User: minimum
 * Date: 9/30/13
 * Time: 1:56 PM
 * To change this template use File | Settings | File Templates.
 */


define(['knockout','../entity/directory','../entity/unit','../entity/asperaserver','../entity/user','../entity/sessionresult'
    ,'../entity/metadata','../entity/task','../business/function','../business/utils'],
    function(ko, Directory, Unit, AsperaServer, User, SessionResult, Metadata, Task, FunctionBO, UtilsBO) {

    var self = {


        GetTaskObject : function(taskData){
            var newTask =  new Task();


            if(!UtilsBO.IsNullOrEmpty(taskData))
            {
                // Specify Observable
                newTask.TaskId(taskData.TaskId);
                newTask.TaskName(taskData.TaskName);
                newTask.TaskStatus(taskData.TaskStatus);
                newTask.IsImportant(taskData.IsImportant);
                newTask.IsUrgent(taskData.IsUrgent);
                newTask.CreatedDate(taskData.CreatedDate);

            }
            return newTask;
        }


    };

    return self;


});