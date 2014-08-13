/**
 * Created with JetBrains WebStorm.
 * User: minimum
 * Date: 9/29/13
 * Time: 11:09 PM
 * To change this template use File | Settings | File Templates.
 */

define(['jquery', 'knockout', 'entity/downloadfile','entity/file', 'business/constants' ],
    function($, ko, DownloadFile, File, Constants) {

    var self = {   // this line is changed

        AddFile : function(FileArray, DownloadFileArray, CurrentContext, App, Video){

            // CurrentContext might be Dashboard, Upload...
            var sessionResult = ko.utils.arrayFirst(FileArray(), function(item){
                return item.FilePath() == CurrentContext.SelectedVideo().FilePath();
            });

            if(sessionResult)
            {
                // Check this result
                sessionResult.IsAddToDownload(true);

                var downloadFile = new DownloadFile();
                downloadFile.SessionResult(sessionResult);

                var file = new File();
                file.FileName(sessionResult.FileName());
                file.FilePath(sessionResult.FilePath());
                downloadFile.File(file);


                if(downloadFile)
                {
                    downloadFile.SelectDownloadVideoFunction = self.SelectDownloadVideo.bind(downloadFile, CurrentContext, DownloadFileArray, App);

                    if(DownloadFileArray().length == 0)
                    {
                        downloadFile.IsSelected(true);
                    }

                    // Select
                    var existingItem = ko.utils.arrayFirst(DownloadFileArray(), function(item){
                       return item.SessionResult().SharepointId() == downloadFile.SessionResult().SharepointId();
                    });
                    if(!existingItem){
                        console.log(ko.toJSON(downloadFile));

                        DownloadFileArray.push(downloadFile);
                    }
                }
            }
        },

        // COMMENT FUNCTIONS
        RemoveFile : function(FileArray, File){
            var searchFile = ko.utils.arrayFirst(FileArray(), function(item){
                return item.FilePath() == File.FilePath();
            });

            if(searchFile)
            {
                var confirmation = confirm('Bạn muốn xóa file này khỏi danh sách ?');
                if(confirmation == true)
                {
                    FileArray.remove(searchFile);
                }


            }
        },
        SelectFile : function(Upload, FileArray, File){

            console.log('SELECT');
            var searchFile = ko.utils.arrayFirst(FileArray(), function(item){
                return item.IsSelected() == true;
            });
            if(searchFile)
            {
                searchFile.IsSelected(false);
            }

            if(File)
            {
                File.IsSelected(true);

                Upload.CurrentFile(File);
                Upload.CurrentMetadata(File.Metadata());
            }
        },
        StartUpload : function(Upload, FileArray, HubServer)
        {

        },
        SelectVideo : function(Dashboard, AllVideos, App, Video){

            // Deselect all
            var searchVideo = ko.utils.arrayFirst(AllVideos(), function(item){
                return item.IsSelected() == true;
            });

            if(searchVideo)
            {
                if(searchVideo.SharepointId() == Video.SharepointId()) return;
                else
                {
                    searchVideo.IsSelected(false);

//                    if(Video)
//                    {
//                        Dashboard.SelectedVideo(Video);
//
//                        Dashboard.IsShowSharingPanel(false);
//
//                        console.log(Video.FilePath());
//                        Video.IsSelected(true);
//                        Video.IsNewFile(false);
//
//                        // Load metadata of video
//                        if(Video.IsUpdatedMetadata() == false)
//                        {
//                            App.TransferHub.server.getSessionResultMetadataBySessionFileId(Video.SharepointId(), Video.SessionSendFileId());
//                        }
//
//                        $("video").parent(".flowplayer").flowplayer();
//                    }
                }
            }

            if(Video)
            {
                Dashboard.SelectedVideo(Video);

                Dashboard.IsShowSharingPanel(false);

                Video.IsSelected(true);
                Video.IsNewFile(false);

                // Load metadata of video
                if(Video.IsUpdatedMetadata() == false)
                {
                    App.TransferHub.server.getSessionResultMetadataBySessionFileId(Video.SharepointId(), Video.SessionSendFileId());
                }

                // $("video").parent(".flowplayer").flowplayer();
            }


        },
        SelectDownloadVideo : function(ViewModel, AllDownloadVideos, App, DownloadVideo){

            // Deselect all
            var searchVideo = ko.utils.arrayFirst(AllDownloadVideos(), function(item){
                return item.IsSelected() == true;
            });

            if(searchVideo)
            {
                searchVideo.IsSelected(false);

            }

            if(DownloadVideo)
            {
                DownloadVideo.ParentModel().SelectedVideo(DownloadVideo.SessionResult());

                DownloadVideo.IsSelected(true);


                // Load metadata of video
                if(DownloadVideo.SessionResult().IsUpdatedMetadata() == false)
                {
                    App.TransferHub.server.getSessionResultMetadataBySessionFileId(DownloadVideo.SessionResult().SharepointId(), DownloadVideo.SessionResult().SessionSendFileId());
                }

                // $("video").parent(".flowplayer").flowplayer();
            }


        },
        DeselectVideo : function(Dashboard, AllVideos, Video)
        {
            Video.IsSelected(false);
        },
        DownloadVideo : function(Url)
        {

        },
        GetPagedSessionResult : function(Pagination, PagingItem)
        {
            var activatedPagingItem = ko.utils.arrayFirst(Pagination().PagingList(), function(item){
                return item.IsActive() == true;
            });
            if(activatedPagingItem)
            {
                activatedPagingItem.IsActive(false);
            }

            Pagination().CurrentPage(PagingItem.Number());
            PagingItem.IsActive(true);
        },

        GetFilteredSessionResult : function(App, Dashboard)
        {
            if(Dashboard.IsAllowUpdateNewContent())
            {
                Dashboard.SessionResults.removeAll();

                Dashboard.ShowLoadingPanel(true);
                Dashboard.ShowBlankPanel(false);

                if(Dashboard.Context() == "Dashboard" )
                {
                    App.TransferHub.server.getSessionResultByTimeRange(Dashboard.Configuration(), App.ViewModel.CurrentUser().UserId());
                }
                if(Dashboard.Context() == "Incoming")
                {

                    App.TransferHub.server.getIncomingSessionResultByTimeRange(Dashboard.Configuration(), App.ViewModel.CurrentUser().UserId());
                }

                if(Dashboard.Context() == "Outgoing")
                {
                    App.TransferHub.server.getOutgoingSessionResultByTimeRange(Dashboard.Configuration(), App.ViewModel.CurrentUser().UserId());
                }

                if(Dashboard.Context() == "SystemUnit")
                {
                    App.TransferHub.server.getUnitSessionResultByTimeRange(Dashboard.Configuration(), App.ViewModel.CurrentUser().UserId(), Dashboard.CurrentUnitId());
                }

            }

        }


    };

    return self;


});