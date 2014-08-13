({
    baseUrl: "",
    
    paths: {
        // Aspera plugin
        'aspera.web' : '../app/upload/asperaweb-2',
        'aspera.connectversions' : '../app/upload/connectversions',
        'aspera.connectinstaller' : '../app/upload/connectinstaller-2',
        'aspera.plugininstaller' :  '../app/upload/asperaplugininstaller',

        // Theme plugin
        'theme' : '../assets/scripts/',
        //END THEME PLUGINS

        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-2.3.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'jquery.cookie': '../assets/plugins/jquery.cookie.min',
        'jquery': '../lib/jquery/jquery-1.9.1',

        // Signalr plugin
        "signalr": "../lib/signalr/jquery.signalR-1.1.3",
        "signalr.hubs": "http://localhost:7070/signalr/hubs?",
        'entity' : 'entity',

        // Flow player
        'flowplayer' : '../lib/flowplayer/flowplayer',

        // Chosen
        'chosen-plugin' : '../lib/chosen/chosen.jquery',

        // Bootstrap datepicker
        'bootstrap-datepicker' :  '../assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker',
		'bootstrap-toastr' :  '../assets/plugins/bootstrap-toastr/toastr'
    },
    name: "main",
    out: "main-built.js"
})