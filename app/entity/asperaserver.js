
define(['knockout','../business/utils'], function(ko, UtilsBO) {

    // ASPERA SERVER MODEL
    return function (){

        var self = this;

        self.AsperaServerId = ko.observable();
        self.HostName = ko.observable();

        self.HostAddress = ko.observable();
        self.UserName = ko.observable();
        self.Password = ko.observable();
        self.TcpPort = ko.observable();
        self.UdpPort = ko.observable();
        self.TargetRateKbps = ko.observable();
        self.MinimumRateKbps = ko.observable();
        self.ContentProtectionPassphrase = ko.observable();
        self.PreCalculateJobSize = ko.observable();
        self.ResumeCheck = ko.observable();
        self.SourceRootFolder = ko.observable();
        self.DestinationRootFolder = ko.observable();
        self.XmlFileName = ko.observable();
        self.XmlFilePath = ko.observable();
        self.XmlNode = ko.observable();
        self.CreatedDate = ko.observable();
        self.ModifiedDate = ko.observable();


    };
});