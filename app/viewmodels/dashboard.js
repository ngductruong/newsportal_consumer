

define(['jquery', 'knockout','durandal/app', 'business/data','business/function','business/utils', 'business/constants', 'entity/task'],
function($, ko, app, DataHelper, FunctionHelper, UtilsHelper, Constants, Task) {
    return new function() {
        var self = this;


        // Section ---------------------------------------------------------------------
        // This area describe the toggle button for choosing task importance or urgent
        // Toggle buttons
        self.IsNewTaskImportant = ko.observable(true);
        self.ToggleNewTaskImportant = function()
        {
            self.IsNewTaskImportant(!self.IsNewTaskImportant());
        };

        self.IsNewTaskUrgent = ko.observable(true);
        self.ToggleNewTaskUrgent = function()
        {
            self.IsNewTaskUrgent(!self.IsNewTaskUrgent());
        };

        self.ButtonClassForNewTaskImportant = ko.computed(function(){
            if(self.IsNewTaskImportant())
            {
                return "btn btn-default btn-primary";
            }
            else return "btn btn-default btn-info";
        });
        self.ButtonClassForNewTaskUrgent = ko.computed(function(){
            if(self.IsNewTaskUrgent())
            {
                return "btn btn-default btn-primary";
            }
            else return "btn btn-default btn-info";
        });
        // End section  -----------------------------------------------------------------

        self.UITasks = ko.observableArray();
        self.UNITasks = ko.observableArray();
        self.NUITasks = ko.observableArray();
        self.NUNITasks = ko.observableArray();


        self.NewTaskName = ko.observable();

        var ArrangeTask = function(newTask)
        {
            if(newTask.IsImportant() &&  newTask.IsUrgent())  self.UITasks.unshift(newTask);
            if(!newTask.IsImportant() &&  newTask.IsUrgent())  self.UNITasks.unshift(newTask);
            if(newTask.IsImportant() &&  !newTask.IsUrgent())  self.NUITasks.unshift(newTask);
            if(!newTask.IsImportant() &&  !newTask.IsUrgent())  self.NUNITasks.unshift(newTask);
        }

        self.Refresh = function()
        {
            // self.UITasks.removeAll();

            var url =
                Constants.Configuration.Protocol +
                    Constants.Configuration.HostName + "/" +
                    Constants.Configuration.ApplicationName + "/" +
                    "api/tasks";

            $.getJSON(url, function(data) {
                // Now use this data to update your view models,
                // and Knockout will update your UI automatically

                console.log(data);

                for(var i =0; i < data.length; i++)
                {
                    var task = DataHelper.GetTaskObject(data[i]);
                    if(task)
                    {
                        ArrangeTask(task);
                    }
                }
            });
        };

        // This function will add new task
        self.AddNewTask = function()
        {
            var taskName = self.NewTaskName();

            if(UtilsHelper.IsNullOrEmpty(taskName))
            {
                app.showMessage("You must enter a task", "Attention!");
                return;
            }

            var postData = new Task();
            postData.TaskName(self.NewTaskName());
            postData.TaskId("-1");
            postData.IsImportant(self.IsNewTaskImportant());
            postData.IsUrgent(self.IsNewTaskUrgent());

            var url =
                Constants.Configuration.Protocol +
                Constants.Configuration.HostName + "/" +
                Constants.Configuration.ApplicationName + "/" +
                "api/tasks";

            // { TaskName : self.NewTaskName(), TaskStatus : 'U-I'};
            $.post(url, { '' : ko.toJSON(postData)}, function(data) {
                var newTask = DataHelper.GetTaskObject(data);
                ArrangeTask(newTask);

            }).success(function(data){

                    app.showMessage("URI : " + url + "  |  Data : " + JSON.stringify(data), "Successful !");

                }).error(function(data, status){

                    app.showMessage("URI : " + url + "  |  Status" + JSON.stringify(status), "Failed!");

                });
        };

        // This function will add new task
        self.AddNewFailedTask = function()
        {
            var taskName = self.NewTaskName();

            if(UtilsHelper.IsNullOrEmpty(taskName))
            {
                app.showMessage("You must enter a task", "Attention!");
                return;
            }

            var postData = new Task();
            postData.TaskName(self.NewTaskName());
            postData.TaskId("-1");
            postData.IsImportant(self.IsNewTaskImportant());
            postData.IsUrgent(self.IsNewTaskUrgent());

            var url =
                Constants.Configuration.Protocol +
                    Constants.Configuration.HostName + "/" +
                    Constants.Configuration.ApplicationName + "/" +
                    "FAKE/tasks";

            // { TaskName : self.NewTaskName(), TaskStatus : 'U-I'};
            $.post(url, { '' : ko.toJSON(postData)}, function(data) {
                var newTask = DataHelper.GetTaskObject(data);
                ArrangeTask(newTask);

            }).success(function(data){

                    app.showMessage("URI : " + url + "  |  Data : " + JSON.stringify(data), "Successful !");

                }).error(function(data, status){

                    app.showMessage("URI : " + url + "  |  Status" + JSON.stringify(status), "Failed!");

                });
        };

        // This function will finish a task
        self.FinishTask = function(parentContext, task)
        {

            var url =
                Constants.Configuration.Protocol +
                    Constants.Configuration.HostName + "/" +
                    Constants.Configuration.ApplicationName + "/" +
                    "api/tasks";

            var value = 'UPDATE' + task.TaskId();

            $.post(url, { '' : value}, function(data) {
                // Now use this data to update your view models,
                // and Knockout will update your UI automatically

                task.TaskStatus('Finished');

            });
            // parentList.remove(task);

        };

        // This function will remove a task
        self.DeleteTask = function(parentList, task)
        {
            var url =
                Constants.Configuration.Protocol +
                    Constants.Configuration.HostName + "/" +
                    Constants.Configuration.ApplicationName + "/" +
                    "api/tasks";

            var value = 'DELETE' + task.TaskId();
            $.post(url, { '' : value}, function(data) {
                parentList.remove(task);

            }).success(function(data){alert(data)});


        };

        // This is activate function
        self.activate = function()
        {
            self.Refresh();


        };

        // Write dashboard loading operation time
        app.ViewModel.WriteOperationTime('DASHBOARD');


        return self;
    };
});
