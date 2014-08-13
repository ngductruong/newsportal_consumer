define(['plugins/router', 'durandal/app', 'knockout', '../business/hubclient','../business/utils'],
    function (router, app, ko, HubClient, utils ) {

        var self = this;

        self.router = router;
        self.activated = ko.observable(false);
        // Navigation
        self.activate = function () {
            // Activate routing
            router.map([
                { route: '',            title:'Demonstration',              moduleId: 'viewmodels/dashboard',       nav: true}
            ]).mapUnknownRoutes('viewmodels/notfound', 'not-found')
              .buildNavigationModel()
              .activate();

            self.activated(true);
        };







        return self;
});