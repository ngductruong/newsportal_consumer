define(['knockout',  '../business/utils'], function(ko, utils) {
    // try to use new
    return function() {
        var self = this;
        self.JobId = ko.observable();

        self.FileName = ko.observable();
        self.FilePath = ko.observable();
        self.FileSize = ko.observable('-');
        self.FileExtension = ko.observable();
        self.FileNameWithoutExtension = ko.observable();

        self.FileByteSize = ko.observable();
        self.WrittenSize = ko.observable(0);

        self.TransferSpec =  ko.observable();
        self.TransferStatus = ko.observable('ready');
        self.TransferErrorDesc = ko.observable('');

        self.TransferSpeed = ko.observable(0);
        self.Percentage = ko.observable();
        self.TransferSpeedDisplay = ko.computed(function(){
            if(typeof (self.TransferSpeed()) != 'undefined')
            {
                return self.TransferSpeed() + 'Mbps';
            }
            return '';
        });

        // Check if file is start uploading or not
        self.IsStartedUpload = ko.observable(false);

        self.ConnectSetting = ko.observable();


        self.PercentageDisplay = ko.computed(function(){
            if(typeof (self.Percentage()) != 'undefined')
            {
                return self.Percentage() + '%';
            }
            return;

        });

        self.TransferDisplay = ko.computed(function(){
            if((typeof (self.TransferSpeed()) != 'undefined') &&  (typeof (self.WrittenSize()) != 'undefined'))
            {
                return " (" + self.WrittenSize() + "/" + self.FileSize() + " MB - " + self.TransferSpeedDisplay() + ")";
            }
            return '';
        });


        self.Rate = ko.observable();

        self.RemoveFile = function(){};
        self.ViewMetadata = function(){};

        self.IsSelected = ko.observable(false);

        self.SelectedClass = ko.computed(function(){
           if(self.IsSelected())
           {
               return "background-color:#F3F3A8;";
           }
            else
           {
               return "#f9f9f9";
           }
        });
        self.IsSelectedForUpload = ko.observable(false);
        self.IsStartUpload = ko.observable(false);

        self.SelectedClassForUpload = ko.computed(function(){
            if(self.IsSelectedForUpload())
            {
                return "background-color:#fcb322;";
            }
            else
            {
                return "#f9f9f9";
            }
        });



        self.SelectedStyle = ko.computed(function(){
            if(self.IsSelected())
            {
                return "font-weight:bold";
            }
            else
            {
                return "font-weight:normal";
            }
        });
        self.SelectFile = function(){};


        self.HoveringClass = ko.observable();



        self.IsDownloaded = ko.observable(false);

        // ---------------------------------------------------

        self.Metadata = ko.observable();
        self.IsFetchingMetadata = ko.observable(false);

        // ---------------------------------------------------


        self.Unit = ko.observable();

        self.ToUsers = ko.observableArray();
        self.NotifyUsers = ko.observableArray();

        self.ToUnit = ko.observable();

        self.ToUnitDisplay = ko.computed(function(){

            var result = '';
            if(!utils.IsNullOrEmpty(self.ToUnit()))
            {
                result += self.ToUnit().Name();
            }


            if(self.NotifyUsers().length > 0)
            {
                result += ", thông báo tới : ";
                for(var i=0; i<self.NotifyUsers().length;i++){
                    var currentUser = self.NotifyUsers()[i];
                    if(i < self.NotifyUsers().length - 1){
                        result += currentUser.UserName() + ', ';
                    }
                    else{
                        result += currentUser.UserName();
                    }
                }
            }


            return result;
        });
        self.ToUsersDisplay = ko.computed(function(){
            var result = '';
            for(var i=0; i<self.ToUsers().length;i++){
                var currentUser = self.ToUsers()[i];
                if(i < self.ToUsers().length - 1){
                    result += currentUser.UserName() + ', ';
                }
                else{
                    result += currentUser.UserName();
                }
            }

            return result;
        });


        return self;
    };
});