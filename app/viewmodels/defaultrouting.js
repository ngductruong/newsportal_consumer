
//TRADITIONAL WAY OF DEFINE MODULES
define(['jquery', 'knockout','durandal/app', 'theme/app','../entity/sessionresult','../entity/pagination','../entity/downloadfile','../entity/file', '../business/function','../business/hubclient','../business/utils'],

function($, ko,app, themeapp, SessionResult, Pagination, DownloadFile, File, FunctionBO, HubClient, utils) {

    // Require plugins



    return new function() {
        var self = this;

        self.SystemUnitNavigating = ko.computed(function(){

            // We do not navigating if the route is not activated
            // if(!self.activated()) return;

            // Navigate to system unit
            if(!utils.IsNullOrEmpty(app.ViewModel.CurrentUser().Units()) && app.ViewModel.CurrentUser().Units().length > 0)
            {
                console.log('HERE WE GO NAVIGATE TO SYSTEM UNIT');

                var systemUnitId = app.ViewModel.CurrentUser().Units()[0].UnitId();
                router.navigate('home');
            }
        });

        // Write dashboard loading operation time
        app.ViewModel.WriteOperationTime('DEFAULT ROUTING');

        return self;
    };
});
