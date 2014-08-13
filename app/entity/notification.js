/**
 * Created with JetBrains WebStorm.
 * User: minimum
 * Date: 10/1/13
 * Time: 10:43 AM
 * To change this template use File | Settings | File Templates.
 */

define(['knockout', '../business/utils'], function(ko, utils) {
    // try to use new

    // NOTIFICATION MODEL
    return function Notification(){

        var self = this;

        self.NotificationUser = ko.observable();

        self.NotificationList = ko.observableArray();

        self.NotificationLastNotifyId = ko.observable();

        self.NotificationCount = ko.observable();

        self.IsShowUnreadNotification = function(User){

            return (self.NotificationCount() > 0);
        };
        self.IsShowReadNotification = function(User){

            return (self.NotificationCount() <= 0);
        };

        self.GetNotify = function(NotifyUniqueId){
             for(var i=0; i<self.NotificationCount(); i++)
             {
                  if(self.NotificationList[i].NotifyUniqueId == NotifyUniqueId)
                  {
                    return self.NotificationList[i];
                  }
             }
            return null;
        }

        self.AddNotifyToTop = function(Notify){
            self.NotificationList.unshift(Notify);
        }

        self.AddNotifyToBottom = function(Notify) {
            self.NotificationList.push(Notify);
        }

        self.RemoveNotify = function(notifyUniqueId){
            var comment = ko.utils.arrayFirst(self.NotificationList(), function (item) {
                return item.NotifyUniqueId() == notifyUniqueId;
            });
            // update comment data
            if(comment)
            {
                self.NotificationList.remove(comment);
            }
        }


        self.UpdateNotifyViewed = function(notifyId){
            var notify = ko.utils.arrayFirst(self.NotificationList(), function (item) {
                return item.NotifyId() == notifyId;
            });
            // update notify data
            if(notify)
            {
                notify.NotifyViewed(1);
            }
        }


        self.IsShowNotificationList = ko.observable(false);

        self.ShowNotificationList = function()
        {
            self.IsShowNotificationList(!self.IsShowNotificationList());
        }

        self.CheckNotify = ko.observable(0);

    };
});