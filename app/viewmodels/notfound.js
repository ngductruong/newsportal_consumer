
//TRADITIONAL WAY OF DEFINE MODULES
define([
    'jquery','plugins/router', 'durandal/app', 'knockout', 'theme/app',
    '../business/hubclient','../business/utils',

    'jquery.cookie'], function ($, router, app, ko, themeapp, HubClient, utils) {
    // module function return a instance
    return new function(){
        var self = this;

        return self;
    };


});
