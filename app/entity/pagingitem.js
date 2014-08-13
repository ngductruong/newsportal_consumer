define(['knockout'], function(ko) {
    // try to use new
    return function() {
        var self = this;

        self.Number = ko.observable();
        self.Date = ko.observable();
        self.NavigationFunction = function(){};
        self.IsActive = ko.observable(false);

        self.Style = ko.computed(function(){
            if(self.IsActive()) return "font-weight:bold;background-color:#e2e2e2";
            else return "font-weight:normal";
        });

        return self;
    };
});