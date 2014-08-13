define(['knockout','../business/utils'], function(ko, UtilsBO) {

    // NOTIFICATION MODEL
    return function (){

        var self = this;
        self.DirectoryId = ko.observable();
        self.DirectoryName = ko.observable();
        self.DirectoryPath = ko.observable();

        self.ParentDirectoryId = ko.observable();
        self.DirectoryType = ko.observable();
        self.Note = ko.observable();
        self.CreatedDate = ko.observable();
        self.ModifiedDate = ko.observable();
        self.ChildDirectories = ko.observableArray();

        // Commit new file
    };
});