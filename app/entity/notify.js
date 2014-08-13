/**
 * Created with JetBrains WebStorm.
 * User: minimum
 * Date: 10/1/13
 * Time: 10:30 AM
 * To change this template use File | Settings | File Templates.
 */


define(['knockout', '../business/utils'], function(ko, utils) {
    // try to use new

    // NOTIFY
    return function Notify(){

        var self = this;
        self.ParentModel = ko.observable();

        self.NotifyId = ko.observable();
        self.NotifyUniqueId = ko.observable();
        self.NotifyImage = ko.observable();

        self.NotifyViewed = ko.observable();
        self.NotifyViewedStyle = ko.computed(function(){
           if(self.NotifyViewed() == 0)
           {
               return "background-color:#eceff5";
           }
           return "background-color:#fff";
        });

        self.NotifyContent = ko.observable();
        self.NotifyNavigateFunction = ko.observable();
        self.NotifyType = ko.observable();
        self.NotifyCreatedDateDisplay = ko.observable();


        self.NotifyPost = ko.observable();
        self.NotifyComment = ko.observable();
        self.NotifyUser = ko.observable();

        return self;
    };
});