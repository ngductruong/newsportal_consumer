define(['knockout', '../entity/pagingitem'], function(ko, PagingItem) {
    // try to use new
    return function() {
        var self = this;

        self.PagingList = ko.observableArray();
        self.CurrentPage = ko.observable();
        self.PagingSize = ko.observable(20);


        return self;
    };
});