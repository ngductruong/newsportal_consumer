
define(['knockout','../business/utils'], function(ko, UtilsBO) {

    // ASPERA SERVER MODEL
    return function (){

        var self = this;
        self.ParentModel = ko.observable();

        self.SessionResult = ko.observable();
        self.File = ko.observable();
        self.TransferSourceUrl = ko.observable();
        self.SelectDownloadVideoFunction = function(){};

        // Check is start download
        self.IsStartDownload = ko.observable(false);

        self.IsSelected = ko.observable();
        self.SelectedBackground = ko.computed(function(){
            if(self.IsSelected() == true)
            {
                return "background-color:#ffc";
            }
            else return "background-color:  #f4f4f4";
        });

        self.DownloadStatus = ko.observable();
        self.DownloadStatusStyle = ko.computed(function(){
            if(self.DownloadStatus() == 'failed')
            {
                return "fontWeight:bold;color:red;"
            }

            if(self.DownloadStatus() == 'completed')
            {
                return "fontWeight:bold;color:blue;"
            }

            return "fontWeight:bold;color:green;"
        });
        self.IsDownloadError = ko.computed(function(){
            if(self.DownloadStatus() == 'failed')
            {
                return true;
            }
            else return false;
        });

        self.DownloadErrorCode = ko.observable();
        self.DownloadErrorDesc = ko.observable();

    };
});