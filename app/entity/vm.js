define(['durandal/app','knockout'], function(app, ko) {
    // try to use new
    return function() {
        var self = this;

        // Current context of viewmodel
        self.ConnectionId = ko.observable();

        // Current Logged user
        self.CurrentUser = ko.observable(null);


        self.LoadingPercentage = ko.observable(10);

        // Set start date to calculate loading time
        self.StartDate = ko.observable(new Date());

        // Write date function
        self.WriteDate = function(date){
            var currentdate = date;

            var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
            return datetime;
        };

        // Write operation time
        self.WriteOperationTime = function(functionName){

            var date1 = new Date();

            var diff = Math.abs(date1 - self.StartDate());
            console.log('------------OPERATION TIME FOR : ' + functionName + '-------------------');
            console.log("Start at : " + self.WriteDate(self.StartDate()));
            console.log("Time span : " + diff + " ms");
            console.log('---------------------------------------------');
        };


        // Return current value
        return self;
    };
});