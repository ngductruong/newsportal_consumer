
/*!
 * VTV Transfer file
 * Copyright Savis Corporation
 *
 */


requirejs.config({

//    var installerPath = currentProto + "//d3gcli72yxqn2z.cloudfront.net/connect/";
//var installersLoaded = 0;
//
//$.getScript(installerPath + "asperaweb-2.js", function(data, textStatus, jqxhr) { checkInstallersLoaded(); });
//$.getScript(installerPath + "connectversions.js", function(data, textStatus, jqxhr) { checkInstallersLoaded(); });
//$.getScript(installerPath + "connectinstaller-2.js", function(data, textStatus, jqxhr) { checkInstallersLoaded(); });

    urlArgs: "bust=" +  (new Date()).getTime(),
    waitSeconds : 30,
    paths: {

        //END THEME PLUGINS

        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-2.3.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap',

        'jquery': '../lib/jquery/jquery-1.9.1',

        // Signalr plugin
        // "signalr": "../lib/signalr/jquery.signalR-1.1.3",

        // "signalr.hubs": "http://localhost:7070/signalr/hubs?",
        // "signalr.hubs": "http://realtime.fts.vtv.vn:85/signalr/hubs?",
        //"signalr.hubs": "http://10.38.252.238:85/signalr/hubs?",
        //"signalr.hubs": "http://traodoidulieu.vtv.vn:85/signalr/hubs?",

        'entity' : 'entity',


        // Chosen
        'chosen-plugin' : '../lib/chosen/chosen.jquery',
        // Slim scroll
        'slimscroll-plugin' : '../assets/plugins/jquery-slimscroll/jquery.slimscroll',

        // Bootstrap datepicker
        'bootstrap-toastr' :  '../assets/plugins/bootstrap-toastr/toastr'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        'theme.app': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        // "signalr": { deps: ["jquery"] },
//        "signalr.hubs": { deps: ["signalr"] },

        'chosen-plugin': {
            deps: ['jquery'],
            exports: 'chosen'
        },
        'bootstrap-toastr': {
            deps: ['jquery'],
            exports: 'toastr'
        }

    }
});

// Use this build command
// node r.js -o build.js

require([
    'jquery',
    'knockout',
    // 'signalr',
   // 'signalr.hubs',
    'durandal/system',
    'durandal/app',
    'durandal/viewLocator',
    '../app/business/hubclient',
    '../app/entity/file',
    '../app/entity/user',
    '../app/entity/vm'],
    function ($, ko, system, app, viewLocator, HubClient, File, User, ViewModel) {


        //>>excludeStart("build", true);
        system.debug(true);
        //>>excludeEnd("build");

        // application title
        app.title = 'Task manager for you';

        // Init application view model
        app.ViewModel = new ViewModel();

        // Print current start date
        console.log(app.ViewModel.StartDate());
        
        app.configurePlugins({
            router:true,
            dialog: true,
            widget: true
        });

        // signalr connections
        // $.connection.hub.url =  "http://10.38.252.238:85/signalr/hubs";

        //$.connection.hub.url =  "http://traodoidulieu.vtv.vn:85/signalr/hubs";

        // $.connection.hub.url =  "http://localhost:7070/signalr/hubs";
//        $.connection.hub.url =  "http://realtime.fts.vtv.vn:85/signalr/hubs";
//
//        // app.TransferHub = $.connection.transferHub;
//        app.TransferHub = $.connection.transferHub;
//        app.TransferHub = HubClient.UpdateClientReceiver(app.TransferHub, app.ViewModel, app);


        var user = new User();
        user.SharepointId($('#ipusnspid').val());
        user.UserId($('#ipusnid').val());
        user.UserName($('#ipusnname').val());
        user.UserAvatar($('#ipusnavatar').val());
        // Set DAM_Role
        user.DAM_Role($('#ipusrrole').val());
        app.ViewModel.CurrentUser(user);

        console.log('-----------------------------------------------------------------------------');
        console.log('-------------------------APPLICATION INITIALIZED-----------------------------');
        console.log('-----------------------------------------------------------------------------');

        app.ViewModel.WriteOperationTime('APPLICATION INITIALIZED');

        app.start().then(function() {

            console.log('-----------------------------------------------------------------------------');
            console.log('------------------------- APPLICATION STARTING-- ----------------------------');
            console.log('-----------------------------------------------------------------------------');

            app.ViewModel.WriteOperationTime('APPLICATION STARTING');

            //console.log($.connection.hub.id);
            console.log(app.ViewModel.CurrentUser().UserName());

            // Set connection Id
            //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
            //Look for partial views in a 'views' folder in the root.
            viewLocator.useConvention();

            //Show the app by setting the root view model for our application with a transition.
            // set Root of app, using shell.js and shell.html


            app.ViewModel.LoadingPercentage(10);


            app.ViewModel.LoadingPercentage(20);



            console.log(app.ViewModel.LoadingPercentage());

            app.setRoot('viewmodels/shell', 'entrance');

            console.log('-----------------------------------------------------------------------------');
            console.log('------------------------- APPLICATION FINISH STARTED-------------------------');
            console.log('-----------------------------------------------------------------------------');

            // console.log(app.TransferHub);
            app.ViewModel.WriteOperationTime('APPLICATION FINISH STARTED');
        });


    });