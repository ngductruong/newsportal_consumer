/**
 * Created with JetBrains WebStorm.
 * User: minimum
 * Date: 10/2/13
 * Time: 9:44 AM
 * To change this template use File | Settings | File Templates.
 */
// define me
define(function() {
    return {
        NotifyTypes :
        {
            Like : "Like",
            Comment : "Comment",
            Post : "Post",
            Tag : "Tag",
            LikeComment: "LikeComment"
        },
        Links :
        {
            Forum : "Forum.html",
            Post : "Post.html?id=",
            Topic : "Topic.html?id=",
            User : "User.html?n="
        },
        UploadMessages :
        {

        },
        TranscodeStatus :
        {
            Transcoding : "Transcoding",
            Finished : "Finished"
        },
        Configuration :
        {
            FolderXml : "\\AsperaFolder",
            HostAddressHN : "download.fts.vtv.vn",
            UserHN : "svcAspera",
            PasswordHN : "Vtv@123",
            RateHN : 150000,
            Protocol : "http://",
            HostName : "min.vn",
            ApplicationName : "etm"
        }

    }
});