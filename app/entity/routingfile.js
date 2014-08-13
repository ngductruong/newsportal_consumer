define(['knockout'], function(ko) {
    // try to use new
    return function() {
        var self = this;

        self.AsperaServers = ko.observableArray();
        self.SessionFiles = ko.observableArray();
        self.SessionInfo = ko.observable();

        return self;
    };
});