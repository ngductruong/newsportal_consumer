
define(['knockout','../entity/user', '../business/utils'], function(ko, User, UtilsBO) {

    // NOTIFICATION MODEL
    return function (){

        var self = this;
        self.SharepointId = ko.observable();
        self.UnitId = ko.observable();
        self.AsperaServerId = ko.observable();
        self.AsperaServer = ko.observable();

        self.DefaultDirectoryId = ko.observable();
        self.DefaultDirectory = ko.observable();
        self.Code = ko.observable();
        self.Name = ko.observable();
        self.Address = ko.observable();
        self.Tel = ko.observable();
        self.Fax = ko.observable();
        self.Email = ko.observable();
        self.Website = ko.observable();
        self.Info = ko.observable();

        self.ParentUnitId = ko.observable();
        self.ParentUnit = ko.observable();
        self.ChildUnits = ko.observableArray();
        self.HasChild = ko.computed(function(){
             if(UtilsBO.IsNullOrEmpty(self.ChildUnits()))
             {
                 return false;
             }
            else
             {
                 if(self.ChildUnits().length > 0)
                 {
                     return true;
                 }
             }
            return false;
        });
        self.Note = ko.observable();
        self.CreateDate = ko.observable();
        self.ModifiedDate = ko.observable();

        self.Users = ko.observableArray();
        self.Level = ko.observable();
        self.Style = ko.observable();
        self.IsLeaf = ko.observable(false);

        self.DisplayName = ko.computed(function(){
           if(!UtilsBO.IsNullOrEmpty(self.Name()))
           {
               if(self.Level() == 1)
               {
                   self.Style = "font-size:12px;";
               }
               if(self.Level() == 2)
               {
                   self.Style = "font-size:12px;";
                  // return '-\\ ' + self.Name();
               }
               if(self.Level()==3)
               {
                   self.Style = "font-size:12px";
                  // return "-----\\ " + self.Name();
               }


               return self.Name();
           }
        });
        self.DisplayHierachyName = ko.computed(function(){
            if(!UtilsBO.IsNullOrEmpty(self.Name()))
            {
                if(self.Level() == 1)
                {
                    self.Style = "font-size:12px;";
                }
                if(self.Level() == 2)
                {
                    self.Style = "font-size:12px;";
                    return '--\\ ' + self.Name();
                }
                if(self.Level()==3)
                {
                    self.Style = "font-size:12px";
                    return "-----\\ " + self.Name();
                }


                return self.Name();
            }
        });
        self.DisplayPath = ko.observable();

        self.LinkUrl = ko.computed(function(){
            return "#systemunit/" + self.UnitId();
        });

        self.Class = ko.observable('');
        self.ShowContent = ko.observable(true);
        self.ShowChild = ko.observable(false);
        self.ShowChildFunction = function()
        {
            //alert('Show Child');
            self.ShowChild(!self.ShowChild());
        }



    };
});