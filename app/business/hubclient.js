/**
 * Created with JetBrains WebStorm.
 * User: minimum
 * Date: 9/30/13
 * Time: 9:42 AM
 * To change this template use File | Settings | File Templates.
 */


// DEFINE JS
define(['jquery', 'knockout','business/data','chosen-plugin', 'business/utils', 'business/function','../entity/sessionresult', '../entity/pagination', '../entity/pagingitem','bootstrap-toastr'],function($, ko, DataBO, chosen, utils, FunctionBO,SessionResult, Pagination, PagingItem, toastr)
{
    return {

        // UpdateClientReceiver hub, set hub client receivers
        UpdateClientReceiver : function(HubInstance, ViewModel, App){
            HubInstance.client.startUp = function() {};

            HubInstance.client.updateCurrentUserUnit = function(units)
            {
                App.ViewModel.LoadingState('Tải dữ liệu người dùng');

                if(!utils.IsNullOrEmpty(units))
                {
                    for(var i=0; i< units.length;i++)
                    {
                        var unitData = units[i];

                        var unit = DataBO.GetUnitObject(unitData);

                        var existingUnit = ko.utils.arrayFirst(App.ViewModel.CurrentUser().Units(), function(item){
                            return item.UnitId() == unit.UnitId();
                        });

                        if(!existingUnit)
                        {
                            App.ViewModel.CurrentUser().Units.push(unit);
                        }

                    }
                }

                App.ViewModel.LoadingIndicator(3);
            };

            HubInstance.on('getSystemUnits', function(units) {

                if(!utils.IsNullOrEmpty(units))
                {
                    for(var i=0; i< units.length;i++)
                    {
                        var unitData = units[i];

                        var unit = DataBO.GetUnitObject(unitData);

                        var existingUnit = ko.utils.arrayFirst(ViewModel.SystemUnits(), function(item){
                            return item.UnitId() == unit.UnitId();
                        });

                        if(!existingUnit)
                        {
                            ViewModel.SystemUnits.push(unit);
                        }

                        ViewModel.LoadingIndicator(ViewModel.LoadingIndicator() +0.2);
                    }

                    App.ViewModel.LoadingState('Tải dữ liệu thư mục');
                    App.ViewModel.LoadingIndicator(5);
                }
            });


            // Get new session result from server
            // toArray : where to add this session result (Dashboard-Incoming-Outgoing)
            HubInstance.on('getNewSessionResult', function(sessionResultData, toArray, FromUser) {
                if(toArray == "Incoming" || toArray == "Incoming-Sharing")
                {
                    var clientUser = App.ViewModel.CurrentUser().SharepointId() + ";#" + App.ViewModel.CurrentUser().UserId();
                    var toUser = sessionResultData.ToUserId;
                    if(clientUser == toUser)
                    {
                        toastr.options = {
                            "closeButton": true,
                            "debug": false,
                            "positionClass": "toast-top-right",
                            "onclick": null,
                            "showDuration": "1000",
                            "hideDuration": "1000",
                            "timeOut": "100000",
                            "extendedTimeOut": "1000",
                            "showEasing": "swing",
                            "hideEasing": "linear",
                            "showMethod": "fadeIn",
                            "hideMethod": "fadeOut"
                        }

                        //ViewModel.ShowLoadingPanel(false);
                        var sessionResult = DataBO.GetSessionResultObjectWithoutBinding(sessionResultData, App);


                        sessionResult.PagingNumber(1);
                        sessionResult.IsUpdated(true);
                        sessionResult.IsNewFile(true);


                        if(toArray == "Incoming")
                        {
                            console.log('New Incoming Arrived - Name : ' +  sessionResult.FileTitle() + ' Status : ' + sessionResult.Status());
                            toastr.info('Bạn vừa nhận được file : "<b>' + sessionResult.FileTitle() + '</b>" từ <b>' + sessionResult.DisplayFromUser() + '</b> !', 'Có file mới đến !');
                            ViewModel.NewSessionResultIncomingArray.push(sessionResult);
                        }
                        if(toArray == "Incoming-Sharing")
                        {
                            console.log('New Incoming-Sharing Arrived - Name : ' +  sessionResult.FileTitle() + ' Status : ' + sessionResult.Status());
                            toastr.warning('<b>' + FromUser + '</b> vừa chia sẻ file ' + '<b>' + sessionResult.FileTitle() + '</b> cho bạn, bạn có thể tải hoặc chia sẻ lại file này', 'Có file vừa được chia sẻ !');
                            ViewModel.NewSessionResultSharingArray.push(sessionResult);
                        }

                    }
                }

                if(toArray == "Outgoing")
                {
                    // Notify

                    //ViewModel.ShowLoadingPanel(false);
                    var sessionSendFileId =   sessionResultData.SessionSendFileId;
                    // Check if this is already in new sessionresult array
                    var existedSessionResult = ko.utils.arrayFirst(ViewModel.NewSessionResultOutgoingArray(), function(item){
                        return item.SessionSendFileId() == sessionSendFileId ;
                    });

                    if(!existedSessionResult)
                    {

                        toastr.options = {
                            "closeButton": true,
                            "debug": false,
                            "positionClass": "toast-top-right",
                            "onclick": null,
                            "showDuration": "1000",
                            "hideDuration": "1000",
                            "timeOut": "100000",
                            "extendedTimeOut": "1000",
                            "showEasing": "swing",
                            "hideEasing": "linear",
                            "showMethod": "fadeIn",
                            "hideMethod": "fadeOut"
                        }

                        var sessionResult = DataBO.GetSessionResultObjectWithoutBinding(sessionResultData, App);
                        console.log('New Outgoing Arrived - Name : ' +  sessionResult.FileTitle() + ' Status : ' + sessionResult.Status());
                        // console.log(ko.toJSON(sessionResult));
                        sessionResult.PagingNumber(1);
                        sessionResult.IsUpdated(true);
                        sessionResult.IsNewFile(true);

                        toastr.success('Bạn vừa gửi file : <b>' + sessionResult.FileTitle() + '</b> !', 'Đã gửi file !');

                        ViewModel.NewSessionResultOutgoingArray.push(sessionResult);
                    }
                }

                // Update current model
                if(App.ViewModel.CurrentContext() == "Dashboard" ||
                    App.ViewModel.CurrentContext() == "Incoming" ||
                    App.ViewModel.CurrentContext() == "Outgoing"){

                    // active view
                    // on this active function, we bind the event for sessionresult object
                    if(!utils.IsNullOrEmpty(App.ViewModel.CurrentViewModel()))
                    {
                        App.ViewModel.CurrentViewModel().activate();
                    }

                }

            });


            // Update sharing progress
            HubInstance.on('finishSharingProcess', function(sessionResultSharepointId, toUserId, FromUser, Message) {
                // Update current model
                if(!utils.IsNullOrEmpty(sessionResultSharepointId))
                {
                    var clientUser = App.ViewModel.CurrentUser().UserName();
                    console.log(FromUser + "-" + clientUser);

                    if(FromUser == clientUser)
                    {
                        App.showMessage("Chia sẻ file thành công !", "Thông báo");
                        App.ViewModel.CurrentViewModel().IsProcessingSharing(false);
                    }
                }
                else
                {

                    var clientUser = App.ViewModel.CurrentUser().UserName();
                    console.log(FromUser + "-" + clientUser);

                    if(FromUser == clientUser)
                    {
                        App.showMessage(Message, "Lỗi khi chia sẻ file");
                        if(App.ViewModel.CurrentContext() == "Dashboard" ||
                            App.ViewModel.CurrentContext() == "Incoming" ||
                            App.ViewModel.CurrentContext() == "Outgoing" ||
                            App.ViewModel.CurrentContext() == "Search" ||
                            App.ViewModel.CurrentContext() == "SystemUnit"){
                            App.ViewModel.CurrentViewModel().IsProcessingSharing(false);
                        }
                    }
                }



            });

            // Get new session result from server
            // toArray : where to add this session result (Dashboard-Incoming-Outgoing)
            HubInstance.on('updateSessionResultStatus', function(sessionResultSharepointId, toUserId, Status){
            var clientUser = App.ViewModel.CurrentUser().SharepointId() + ";#" + App.ViewModel.CurrentUser().UserId();

                //ViewModel.ShowLoadingPanel(false);
                var outgoingSessionResult = ko.utils.arrayFirst(ViewModel.NewSessionResultOutgoingArray(), function(item){
                    return item.SharepointId() == sessionResultSharepointId;
                });

                var incomingSessionResult = ko.utils.arrayFirst(ViewModel.NewSessionResultIncomingArray(), function(item){
                    return item.SharepointId() == sessionResultSharepointId;
                });

                if(incomingSessionResult){
                    console.log('Update Incoming - Name : ' +  incomingSessionResult.FileTitle() + ' Status : ' + Status);
                    incomingSessionResult.Status(Status);
                }

                if(outgoingSessionResult){
                    console.log('Update Outgoing - Name : ' +  outgoingSessionResult.FileTitle() + ' Status : ' + Status);
                    outgoingSessionResult.Status(Status);
                }
            });

            return HubInstance;
        },

        UpdateRightNavReceiver : function(HubInstance, ViewModel, App){

            HubInstance.on('getDirectory', function(directories) {

                for(var i=0; i<directories.length;i++)
                {
                    var directoryData = directories[i];

                    var directoryParentId = directoryData.ParentDirectoryId;
                    var directoryObject = DataBO.GetDirectoryObject(directoryData);

                    // Add root node
                    if(utils.IsNullOrEmpty(directoryParentId))
                    {
                        ViewModel.Directories.push(directoryObject);
                    }
                    else
                    {
                        // Find in level 0
                        var parentDir =  ko.utils.arrayFirst(ViewModel.Directories(), function (item) {
                            return item.DirectoryId() == directoryParentId;
                        });
                        if(parentDir)
                        {
                            parentDir.ChildDirectories.push(directoryObject);
                        }
                        else
                        {
                            // Find in level 1
                            for(var j=0;j<ViewModel.Directories().length;j++)
                            {
                                var pDir = ViewModel.Directories()[j];
                                for(var k=0;k < pDir.ChildDirectories().length;k++)
                                {
                                    var cDir = pDir.ChildDirectories()[k];
                                    if(cDir.DirectoryId() == directoryParentId)
                                    {
                                        cDir.ChildDirectories.push(directoryObject);
                                    }
                                }
                            }
                        }



                    }
                }

            });



            return HubInstance;
        },

        // ViewModel is upload module
        UpdateUploadClientReceiver : function(HubInstance, ViewModel, App){

            HubInstance.on('addNewUnitUpload', function(units) {

                for(var i=0; i< units.length;i++)
                {
                    var unitData = units[i];

                    var unit = DataBO.GetUnitObject(unitData);

                    ViewModel.Units.push(unit);

                }
            });

            HubInstance.on('updateSessionId', function(sessionId) {

                console.log('Update SessionId : ' + sessionId);
                ViewModel.Session().SessionId(sessionId);

            });

            HubInstance.on('getUnit', function(units) {

                console.log('============ Run get unit');
                for(var i=0; i< units.length;i++)
                {
                    var unitData = units[i];

                    var unit = DataBO.GetUnitObject(unitData);

                    var existingUnit = ko.utils.arrayFirst(ViewModel.Units(), function(item){
                        return item.UnitId() == unit.UnitId();
                    });

                    if(!existingUnit)
                    {
                        ViewModel.Units.push(unit);
                    }

                }
            });

            HubInstance.on('updateFileMetadata', function(fileName, fileData) {

                console.log('============ Update File Metadata');

                ko.utils.arrayForEach(ViewModel.FileArray(), function(file){

                    console.log(ko.toJSON(file));

                    var filePath = file.FilePath();
                    if(!utils.IsNullOrEmpty(filePath))
                    {
                        var trimmedFileName = filePath.replace(/^.*(\\|\/|\:)/, '');

                        if(utils.GetFileName(fileName).FileNameWithoutExtension == utils.GetFileName(trimmedFileName).FileNameWithoutExtension)
                        {
                            var parsedMetadata = JSON.parse(fileData);

                            console.log(parsedMetadata);


                            file.Metadata().Title(parsedMetadata.Title);
                            file.Metadata().Author(parsedMetadata.Author);
                            file.Metadata().Director(parsedMetadata.Director);
                            file.Metadata().ScriptWriter(parsedMetadata.ScriptWriter);
                            file.Metadata().Audio(parsedMetadata.Audio);
                            file.Metadata().Light(parsedMetadata.Light);
                            file.Metadata().Camera(parsedMetadata.Camera);
                            file.Metadata().Cast(parsedMetadata.Cast);
                            file.Metadata().Publisher(parsedMetadata.Publisher);
                            file.Metadata().Summary(parsedMetadata.Summary);
                            // file.Metadata().DisplayDate(parsedMetadata.DisplayDate);

                            file.Metadata().Episode(parsedMetadata.Episode);
                            file.Metadata().Format(parsedMetadata.Format);
                            file.Metadata().FileCode(parsedMetadata.FileCode);
                            file.Metadata().FileName(parsedMetadata.FileName);
                            file.Metadata().FileCreator(parsedMetadata.FileCreator);
                            file.Metadata().Duration(parsedMetadata.Duration);
                            file.Metadata().ApprovedBy(parsedMetadata.ApprovedBy);
                            file.Metadata().Rating(parsedMetadata.Rating);
                            file.Metadata().PublicationHistory(parsedMetadata.PublicationHistory);
                            file.Metadata().Bulletin(parsedMetadata.Bulletin);
                            file.Metadata().Copyright(parsedMetadata.Copyright);
                            file.Metadata().Language(parsedMetadata.Language);
                            file.Metadata().Keyword(parsedMetadata.Keyword);
                            file.Metadata().Type(parsedMetadata.Type);
                            file.Metadata().TapeCode(parsedMetadata.TapeCode);
                            file.Metadata().Award(parsedMetadata.Award);


                            // Stop fetching data
                            file.IsFetchingMetadata(false);
                        }
                    }

                });

            });



            return HubInstance;
        },

        UpdateDashboardClientReceiver : function(HubInstance, ViewModel, App, Context){

            App.ViewModel.CurrentContext(Context);

            HubInstance.on('getListSessionResult', function(sessionResults, senderContext) {

                console.log('getListSessionResult : ' + App.ViewModel.CurrentContext());
                console.log('Context : ' + Context + ' -- sender context : ' + senderContext);

                ViewModel.ShowLoadingPanel(false);

                // ViewModel = Dashboard Model
                var pagingSize = ViewModel.Pagination().PagingSize();
                var pagination = new Pagination();
                var currentPage = 1;

                if(utils.IsNullOrEmpty(sessionResults))
                {
                    console.log('UpdateDashboardClientReceiver - getListSessionResult - NO RECORD WAS FOUND');
                    return;
                }

                for(var i=1; i<= sessionResults.length;i++)
                {
                    var sessionResultId = sessionResults[i-1];
                    var sessionResult = new SessionResult();
                    sessionResult.SharepointId(sessionResultId);
                    sessionResult.PagingNumber(currentPage);
                    sessionResult.IsUpdated(false);
                    sessionResult.SelectVideoFunction = FunctionBO.SelectVideo.bind(sessionResult, ViewModel, ViewModel.SessionResults, App);
                    sessionResult.AddToDownloadFunction = FunctionBO.AddFile.bind(sessionResult, ViewModel.SessionResults, App.ViewModel.DownloadFileArray, ViewModel, App);


                    // Insert this session result to current context

                    // 1. if current context is not the sender context
                    // means that user has navigated away
                    // we add to dashboard array
                    if(Context != senderContext)
                    {
                        console.log('Different context - ' + Context + '-' + senderContext);
                        // return;
                        var array;
                        switch (senderContext) {

                            case 'Dashboard':
                                array = App.ViewModel.SessionResultDashboardArray();
                                break;
                            case 'Incoming':
                                array = App.ViewModel.SessionResultIncomingArray();
                                break;
                            case 'Outgoing':
                                array = App.ViewModel.SessionResultOutgoingArray();
                                break;
                        }

                        if(senderContext == "Dashboard" || senderContext=="Incoming" || senderContext == "Outgoing")
                        {
                            var existingSessionResult = ko.utils.arrayFirst(array, function(item){
                                return item.SharepointId() == sessionResult.SharepointId();
                            });

                            if(!existingSessionResult)
                            {
                                array.push(sessionResult);
                            }
                        }

                    }
                    else
                    {

                    }


                    var existingSessionResult = ko.utils.arrayFirst(ViewModel.SessionResults(), function(item){
                        return item.SharepointId() == sessionResult.SharepointId();
                    });

                    if(!existingSessionResult)
                    {
//                        console.log('Current Size  : ' +  ViewModel.SessionResults().length);
//                        if(ViewModel.SessionResults().length > 0)
//                        {
//                            console.log('ID at 0  : ' +  ViewModel.SessionResults()[0].SharepointId());
//                        }

                        ViewModel.SessionResults.push(sessionResult);
                        //console.log('Push item, SP ID : ' + sessionResult.SharepointId());
                    }

                    // Generate paging numbers
                    if(i==1 || i % pagingSize==0)
                    {
                        // Add pagination
                        var pagingItem = new PagingItem();
                        if(i!=1) currentPage = currentPage + 1;
                        pagingItem.Number(currentPage);
                        pagingItem.NavigationFunction = FunctionBO.GetPagedSessionResult.bind(pagingItem, ViewModel.Pagination);
                        pagination.PagingList.push(pagingItem);
                    }
                }
                if(pagination.PagingList().length >= 1)
                {
                    pagination.CurrentPage(1);
                    pagination.PagingList()[0].IsActive(true);
                }

                ViewModel.Pagination(pagination);

                if(sessionResults.length == 0)
                {
                    ViewModel.ShowBlankPanel(true);
                }


            });

            HubInstance.on('updateSessionResult', function(sessionResultData, caller) {
                var serverSessionResult = DataBO.GetSessionResultObject(sessionResultData, ViewModel, ViewModel.SessionResults, App);

                var clientSessionResult = ko.utils.arrayFirst(ViewModel.SessionResults(), function(item){
                     return (item.SharepointId() == serverSessionResult.SharepointId());
                });

                if(clientSessionResult)
                {

                    clientSessionResult.SessionResultId(serverSessionResult.SessionResultId());
                    clientSessionResult.SessionSendFileId(serverSessionResult.SessionSendFileId());
                    clientSessionResult.SessionReceiveFileId(serverSessionResult.SessionReceiveFileId());
                    clientSessionResult.ToUserId(serverSessionResult.ToUserId());
                    clientSessionResult.FromUserId(serverSessionResult.FromUserId());
                    clientSessionResult.HasHighRes(serverSessionResult.HasHighRes());
                    clientSessionResult.HasLowRes(serverSessionResult.HasLowRes());

                    clientSessionResult.DownloadCount(serverSessionResult.DownloadCount());
                    clientSessionResult.FileName(serverSessionResult.FileName());
                    clientSessionResult.FileTitle(serverSessionResult.FileTitle());
                    clientSessionResult.FilePath(serverSessionResult.FilePath());
                    clientSessionResult.FileSource(serverSessionResult.FileSource());
                    clientSessionResult.Thumbnail(serverSessionResult.Thumbnail());
                    clientSessionResult.CreatedDate(serverSessionResult.CreatedDate());
                    clientSessionResult.DisplayDate(serverSessionResult.DisplayDate());
                    clientSessionResult.DisplaySummary(serverSessionResult.DisplaySummary());
                    clientSessionResult.DisplayDownloadLink(serverSessionResult.DisplayDownloadLink());
                    clientSessionResult.Status(serverSessionResult.Status());
                    clientSessionResult.DisplayFromUserUnitId(serverSessionResult.DisplayFromUserUnitId());
                    clientSessionResult.DisplayToUserUnitId(serverSessionResult.DisplayToUserUnitId());
                    clientSessionResult.IsMediaFile(serverSessionResult.IsMediaFile());
                    clientSessionResult.IsShared(serverSessionResult.IsShared());
                    clientSessionResult.SharedByUser(serverSessionResult.SharedByUser());
                    clientSessionResult.IsAllowPreview(serverSessionResult.IsAllowPreview());
                    clientSessionResult.DisplayFromUser(serverSessionResult.DisplayFromUser());
                    clientSessionResult.FileSize(serverSessionResult.FileSize());
                    clientSessionResult.DisplayToUser('tới : ' + serverSessionResult.DisplayToUser());
                    clientSessionResult.ToUserUnit(serverSessionResult.ToUserUnit());

                }
//
//                if(ViewModel.SessionResults().length >= 1)
//                {
//                    var video = ViewModel.SessionResults()[0];
//                    if(video.IsSelected() == false)
//                    {
//                        // Remove any selected videos
//                        var searchVideo = ko.utils.arrayFirst(ViewModel.SessionResults(), function(item){
//                            return item.IsSelected() == true;
//                        });
//
//                        if(searchVideo){
//                            searchVideo.IsSelected(false);
//                        }
//
//                        video.IsSelected(true);
//                        ViewModel.SelectedVideo(video);
//
//                        // Load metadata of video
//                        if(video.IsUpdatedMetadata() == false)
//                        {
//                            App.TransferHub.server.getSessionResultMetadataBySessionFileId(video.SharepointId(), video.SessionSendFileId());
//                        }
//
//                        if(video.IsUpdated())
//                        {
//                            $("video").parent(".flowplayer").flowplayer();
//                        }
//
//                    }
//
//                }


            });

            HubInstance.on('updateSessionResultMetadata', function(sessionResultId, sessionFileId, metadataData) {
                var metadata = DataBO.GetMetadataObject(metadataData);

                var clientSessionResult = ko.utils.arrayFirst(ViewModel.SessionResults(), function(item){
                    return (item.SharepointId() == sessionResultId);
                });

                if(clientSessionResult)
                {
                    clientSessionResult.Metadata(metadata);
                    clientSessionResult.IsUpdatedMetadata(true);
                }

            });

            HubInstance.on('getSharingUnit', function(units) {

                for(var i=0; i< units.length;i++)
                {
                    var unitData = units[i];

                    var unit = DataBO.GetUnitObject(unitData);

                    var existingUnit = ko.utils.arrayFirst(ViewModel.Units(), function(item){
                        return item.UnitId() == unit.UnitId();
                    });

                    if(!existingUnit)
                    {
                        ViewModel.Units.push(unit);
                    }

                }
            });

            return HubInstance;
        },

        RemoveClientReceiver : function(HubInstance){

            HubInstance.off('getListSessionResult');

            HubInstance.off('updateSessionResult');

            HubInstance.off('updateSessionResultMetadata');

            return HubInstance;
        }


    }

});