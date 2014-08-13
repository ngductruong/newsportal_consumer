define(['durandal/app','knockout', '../entity/metadata','../entity/unit', '../business/utils'], function(app, ko, Metadata, Unit, utils) {
    // try to use new
    return function() {
        var self = this;

        // Based properties


        self.TaskId = ko.observable();
        self.TaskName = ko.observable();
        self.TaskStatus = ko.observable();
        self.IsImportant = ko.observable(false);
        self.IsUrgent = ko.observable(false);
        self.CreatedDate = ko.observable();

        self.IsFinished = ko.computed(function(){
            if(self.TaskStatus() == 'Finished')
            return true;
            else return false;
        });

        self.ServerCommand = ko.observable();


        return self;
    };
});