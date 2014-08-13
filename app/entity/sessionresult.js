define(['durandal/app','knockout', '../entity/metadata','../entity/unit', '../business/utils'], function(app, ko, Metadata, Unit, utils) {
    // try to use new
    return function() {
        var self = this;

        // Based properties
        self.SessionResultId = ko.observable();
        self.SessionId = ko.observable();
        self.SessionSendFileId = ko.observable();
        self.SessionReceiveFileId = ko.observable();

        self.ToUserId = ko.observable();
        self.ToUserUnit = ko.observable();
        self.FromUserId = ko.observable();
        self.DisplayFromUserUnitId = ko.observable();
        self.DisplayToUserUnitId = ko.observable();
        self.DisplayFromUser = ko.observable();
        self.DisplayToUser = ko.observable();
        self.DisplayToUnit = ko.computed(function(){
            if(!utils.IsNullOrEmpty(self.ToUserUnit()))
            {
                return 'tới : ' + self.ToUserUnit().Name();
            }
            else return '';
        });

        self.HasHighRes = ko.observable(false);
        self.HasLowRes = ko.observable(false);
        self.Status = ko.observable("----");
        self.IsAllowPreview = ko.observable(true);

        // Sharing info
        self.IsShared = ko.observable(false);
        self.SharedByUser = ko.observable();
        self.DisplaySharedByUser = ko.computed(function(){
            if(!utils.IsNullOrEmpty(self.SharedByUser()))
            {
                return 'chia sẻ bởi : ' +  self.SharedByUser().UserName();
            }
            else return '';
        })
        self.IsAllowDownloadLowRes = ko.computed(function(){
            //if(self.Status() == "TranscodeComplete"){
            //    if(self.HasLowRes() && self.IsAllowPreview())
            //    {
            //         return true;
            //    }
            //}
            return false;
        });
        self.IsAllowDownloadHighRes = ko.computed(function(){
            if(self.Status() == "TranscodeComplete" || self.Status() == "TransferComplete"){
                if(self.HasHighRes())
                {
                    return true;
                }
            }
            return false;
        });
        self.IsAllowSharing = ko.computed(function(){

            if(self.IsShared() && !utils.IsNullOrEmpty(self.ToUserUnit()))
            {
                var isUnitOfUser = ko.utils.arrayFirst(app.ViewModel.CurrentUser().Units(), function(item){
                    return item.UnitId() == self.ToUserUnit().UnitId();
                });


                if(
                   (app.ViewModel.CurrentUser().LookupValue() == self.FromUserId()) ||
                   (isUnitOfUser)
               )
               {
                   return true;
               }
               else return false;
            }

            if(self.Status() == "TranscodeComplete" || self.Status() == "TransferComplete"){
                if(self.HasHighRes())
                {
                    return true;
                }
            }
            return false;
        });

        // Share button event handler
        self.sharebtnclickevent = function(){}

        self.Metadata = ko.observable(new Metadata());

        self.SharepointId = ko.observable();

        self.FileTitle = ko.observable();
        self.FileName = ko.observable();
        self.FilePath = ko.observable();
        self.FileSource = ko.observable();
        self.FileSize = ko.observable(0);

        self.DisplayFileSize = ko.computed(function(){
            if(!utils.IsNullOrEmpty(self.FileSize()))
            {
                  return utils.GetDisplayFileSize(self.FileSize());
            }
            return utils.GetDisplayFileSize(0);

        })
        self.Thumbnail = ko.observable("assets/img/1.png");
        self.IsMediaFile = ko.observable(true);

        self.DisplaySummary = ko.observable();
        self.DownloadCount = ko.observable();
        self.DisplayDownloadLink = ko.observable();
        self.DownloadHighResFunction = function()
        {
            if(self.IsAllowDownloadHighRes() == true)
            {
                console.log('Download');
                windows.open(self.DisplayDownloadLink());
            }
        }
        self.CreatedDate = ko.observable();
        self.ModifiedDate = ko.observable();
        self.DisplayDate = ko.observable();


        // Player properties
        self.Player = ko.computed(function(){
           //if(typeof(self.FilePath()) != "undefined" && self.IsMediaFile() && self.IsAllowPreview() && self.IsAllowDownloadLowRes())
           if(typeof(self.FilePath()) != "undefined" && self.IsMediaFile() && self.IsAllowPreview())
           {
//               var result =
//               "<div class='flowplayer' data-rtmp='rtmp://10.38.252.199:1935/vod' data-ratio='0.5' data-engine='html5' data-swf='assets/flash/flowplayer.swf'>" +
//               "<video poster='" + self.Thumbnail() + "' controls  preload = 'none'>" +
//               "<source type='application/x-mpegurl' src='rtmp://10.38.252.199:1935/vod/_definst_/mp4:" +  self.FilePath()+ "/playlist.m3u8' />" +
//               "<source type='rtmp/mp4' src='mp4:" + self.FilePath() + "' />" +
//               "</video>" +
//               "</div>";
//

//               var result =
//                   "    <div class='flowplayer' style='background-color:#777' data-rtmp='rtmp://115.146.124.184:8484/vod' " +
//                       "data-ratio='0.5' data-engine='html5' data-swf='assets/flash/flowplayer.swf'>" +
//                       "<video poster='http://chungtoilachiensi.nowtv.vn//_layouts/biznews/uploads/video/79/Let-s-Dance-2-mp4.jpg'" +
//                       " controls preload = 'none'>  " +
//                       "  <source type='application/x-mpegurl' src='http://115.146.124.184:8484/vod/_definst_/mp4:video/79/Let-s-Dance-2.mp4/playlist.m3u8' /> " +
//                       "<source type='rtmp/mp4' src='mp4:video/79/Let-s-Dance-2.mp4' />                   </video>" +
//                       "</div>";
               var result =
                   "    <div class='flowplayer'  style='background-image:url(" + self.Thumbnail() + ")' data-rtmp='rtmp://streaming.fts.vtv.vn:1935/vod' " +
                       "data-ratio='0.5' data-engine='html5' data-swf='assets/flash/flowplayer.swf'>" +
                       "<video poster='" + self.Thumbnail() + "' controls >" +
                       "  <source type='application/x-mpegurl' src='http://streaming.fts.vtv.vn:1935/vod/_definst_/mp4:" +  self.FilePath() +"/playlist.m3u8' /> " +
                       "<source type='rtmp/mp4' src='mp4:" + self.FilePath() + "' />                   </video>" +
                       "</div>";
//
//                  var result =
//                   "    <div class='flowplayer'  style='background-image:url(" + self.Thumbnail() + ")' data-rtmp='rtmp://10.38.252.199:1935/vod' " +
//                       "data-ratio='0.5' data-engine='html5' data-swf='assets/flash/flowplayer.swf'>" +
//                       "<video poster='" + self.Thumbnail() + "' controls >" +
//                       "  <source type='application/x-mpegurl' src='http://10.38.252.199:1935/vod/_definst_/mp4:" +  self.FilePath() +"/playlist.m3u8' /> " +
//                       "<source type='rtmp/mp4' src='mp4:" + self.FilePath() + "' />                   </video>" +
//                       "</div>";

//               var result =
//                   "<div class='flowplayer play-button' style='background:#777 no-repeat;' data-swf='assets/flash/flowplayer.swf' data-ratio='0.4167'>" +
//                   "<video controls >" +
//                   "<source type='video/mp4' src='" + self.FilePath() + "'>" +
//                   "</video>" +
//                   "</div>";

               return result;
           }
            return "";
        });

        // Select functions & properties
        self.IsSelected = ko.observable(false);

        // Check for download
        self.IsChecked = ko.observable(false);
        self.SelectVideoFunction = function(){};

        // This field is to specify if file is added to download
        self.IsAddToDownload = ko.observable(false);
        self.IsAddToDownloadButtonClass = ko.computed(function(){
            if(self.IsAddToDownload()) return {
                ButtonClass : "btn red btn-sm",
                IconClass : "fa fa-check"
            }
            else return {
                ButtonClass : "btn btn-primary btn-sm",
                IconClass : "fa fa-plus"
            };
        });
        self.AddToDownloadFunction = function(){};
        self.IsNewFile = ko.observable(false);
        self.IsNewFileClass = ko.computed(function(){
             if(self.IsNewFile()){
                 var obj = {
                     BackgroundColor : "yellow"
                 }
                 return obj;
             }
            else
             {
                 var obj = {
                     BackgroundColor : "#000"
                 }
                 return obj;
             }
        });
        self.SelectedStyle = ko.computed(function(){
           if(self.IsSelected() == true)
           {
               return "color:#e02222";
           }

            //else return "color:#0d638f";
            else return "color:#000";
        });
        self.SelectedBackground = ko.computed(function(){
            if(self.IsSelected() == true)
            {
                return "background-color:#ffc";
            }
            else{
                if(self.IsNewFile()) return "background-color:#ffc";
                else
                return "background-color:  #f4f4f4";
            }
        });

        self.PagingNumber = ko.observable();

        self.IsUpdated = ko.observable(false);
        self.IsUpdatedMetadata = ko.observable(false);



        // Added 26 Dec - TruongND.
        // Status of this session result
        // could be - Uploading, Transfering, Transfered, Transcoding, Transcoded, Failed

        self.DisplayThumbnail = ko.computed(function(){

            if(self.Status() == "Upload"){
                return "assets/img/transfer/upload.png";
            }

            if(self.Status() == "UploadComplete"){
                return "assets/img/transfer/transfer.png";
            }

            if(self.Status() == "TransferComplete"){
                return "assets/img/transfer/transcode.png";
            }

            if(self.Status == "TranscodeComplete"){
                return self.Thumbnail();
            }
            else return self.Thumbnail();

        });

        self.IsAddedToDashboard = ko.observable(false);
        self.IsAddedToIncoming = ko.observable(false);
        self.IsAddedToOutgoing = ko.observable(false);



        return self;
    };
});