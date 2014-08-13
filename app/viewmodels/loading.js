
//TRADITIONAL WAY OF DEFINE MODULES
define([
    'jquery','plugins/router', 'durandal/app', 'knockout'], function ($, router, app, ko) {


   // module function return a instance
    return new function(){
        var self = this;
        // main viewmodel
        self.ViewModel = ko.observable(app.ViewModel);

        self.IsCalled= ko.observable(false);



        self.activate = function()
        {
            // app.setRoot('viewmodels/shell', 'entrance');

            self.IsCalled(true);
            // self.LoadingState(app.ViewModel.LoadingState());
        }

        //app.TransferHub.server.getDirectory();




        // Write dashboard loading operation time
        app.ViewModel.WriteOperationTime('LOADING');

        return self;
    };


});
