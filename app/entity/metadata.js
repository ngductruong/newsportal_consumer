define(['knockout', '../business/utils'], function(ko, utils) {
    // try to use new


    return function() {
        var self = this;
        self.Title = ko.observable();
        self.Author = ko.observable();
        self.Director = ko.observable();
        self.ScriptWriter = ko.observable();
        self.Audio = ko.observable();
        self.Light = ko.observable();
        self.Camera = ko.observable();
        self.Cast = ko.observable();
        self.Publisher = ko.observable();
        self.Summary = ko.observable();

        self.Episode = ko.observable();
        self.Format = ko.observable();
        self.FileCode = ko.observable();
        self.FileName = ko.observable();
        self.FileCreator = ko.observable();
        self.Duration = ko.observable();
        self.ApprovedBy = ko.observable();
        self.Rating = ko.observable();
        self.PublicationHistory = ko.observable();
        self.Bulletin = ko.observable();
        self.Copyright = ko.observable();
        self.Language = ko.observable();
        self.Keyword = ko.observable();
        self.Type = ko.observable();
        self.TapeCode = ko.observable();
        self.Award = ko.observable();

        self.DisplayDate = ko.observable(utils.GetFormattedDate());

        // self.Date = ko.observable();

        self.Date = ko.computed(
        {
            read:function()
            {
                // convert date into iso8601 type
                var str = self.DisplayDate().split('-');
                    if(str.length >= 2){
                    var myDate = new Date(str[2], str[1]-1, str[0]);

                    // console.log(myDate);
                    if(myDate)
                    {
                        var result = utils.ConvertDateToIso8601(myDate);
                        // console.log(result);
                        return result;
                    }
                };
                return '';
            }

        });





        return self;
    };
});