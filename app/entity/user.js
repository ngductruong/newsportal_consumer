
define(['knockout','../business/utils'], function(ko, UtilsBO) {

    // NOTIFICATION MODEL
    return function (){

        var self = this;

        self.UserId = ko.observable();
        self.UserName = ko.observable();
        self.UserAvatar = ko.observable();

        self.DAM_Role = ko.observable();
        self.Tel = ko.observable();
        self.Email = ko.observable();
        self.Note = ko.observable();
        self.CreatedDate = ko.observable();
        self.ModifiedDate = ko.observable();

        self.UnitId = ko.observable();
        self.IsAdmin = ko.computed(function(){
            if(self.DAM_Role() == 1)
            {
                return true;
            }
            return false;
        });

        // Avoid self refference (unit in user and user in unit)
        self.Units = ko.observableArray();
        self.UnitOfUser = ko.observable();

        self.SharepointId = ko.observable();
        self.LookupValue = ko.computed(function(){
            if(!UtilsBO.IsNullOrEmpty(self.SharepointId()) && !UtilsBO.IsNullOrEmpty(self.UserId()))
            {
                return self.SharepointId() + ";#" + self.UserId();
            }
            return '';
        })
        return self;

    };
});