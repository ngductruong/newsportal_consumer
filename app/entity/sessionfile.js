define(['knockout'], function(ko) {
    // try to use new
    return function() {
        var self = this;

        self.SessionFileId = ko.observable();

        self.SessionId = ko.observable();

        self.DAM_FileTransferType= ko.observable();

        self.SessionSendFileId= ko.observable();

        self.FileName= ko.observable();
        self.FilePath= ko.observable();
        self.FileSize= ko.observable();
        self.CreatedDate= ko.observable();
        self.ModifiedDate= ko.observable();
        self.JobId = ko.observable();
        self.AsperaServer = ko.observable();

        // To Users
        self.Users = ko.observableArray();

        // To Unit
        self.ToUnit = ko.observable();

        // Notify Users
        self.NotifyUsers = ko.observableArray();
        return self;
    };
});