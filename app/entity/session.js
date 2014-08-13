define(['knockout'], function(ko) {
    // try to use new
    return function() {
        var self = this;

        self.SessionId = ko.observable();
        self.UserId= ko.observable();
        self.ClientBeginTime = ko.observable();

        self.ClientAddress= ko.observable();
        self.BeginTime= ko.observable();
        self.EndTime= ko.observable();
        self.CreatedDate= ko.observable();
        self.ModifiedDate= ko.observable();

        return self;
    };
});