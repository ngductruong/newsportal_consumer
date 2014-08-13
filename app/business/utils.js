/**
 * Created with JetBrains WebStorm.
 * User: minimum
 * Date: 11/27/13
 * Time: 5:07 PM
 * To change this template use File | Settings | File Templates.
 */

//TRADITIONAL WAY OF DEFINE MODULES
define(['knockout'], function(ko) {

    var pad = function(number) {
        var r = String(number);
        if ( r.length === 1 ) {
            r = '0' + r;
        }
        return r;
    };
    return{
        gettrspec : function(){
            var transferSpec = {
                "paths": [],
                "remote_host": '192.168.1.81',
                "remote_user": 'aspera',
                "remote_password": 'aspera',
                "direction": "send",
                "target_rate_kbps": '400',
                "resume": "sparse_checksum",
                "destination_root": "C:\\"
            };
            return transferSpec;
        },

        GetDate : function(){
            var date = (new Date());

            var d = date.getDate();
            var m = date.getMonth() + 1;
            var y = date.getFullYear();

            var hh = date.getHours();
            var mm = date.getMinutes();
            var ss = date.getSeconds();

            var result =
                (d<=9 ? '0' + d : d) + '/' +
                (m<=9 ? '0' + m : m) + '/' +
                (y<=9 ? '0' + y : y) + ' ' +
                    (hh<=9 ? '0' + hh : hh) + ':' +
                    (mm<=9 ? '0' + mm : mm) + ':' +
                    (ss<=9 ? '0' + ss : ss);

            return result;

        },
        GetFormattedDate : function(){
            var date = (new Date());

            var d = date.getDate();
            var m = date.getMonth() + 1;
            var y = date.getFullYear();

            var hh = date.getHours();
            var mm = date.getMinutes();
            var ss = date.getSeconds();

            var result =
                (d<=9 ? '0' + d : d) + '-' +
                    (m<=9 ? '0' + m : m) + '-' +
                    (y<=9 ? '0' + y : y);

            return result;

        },



        ConvertDateToIso8601 : function(date){
            var t =  date.getUTCFullYear()
                + '-' + pad( date.getUTCMonth() + 1 )
                + '-' + pad( date.getUTCDate() + 1)
                + 'T' + pad( date.getUTCHours() )
                + ':' + pad( date.getUTCMinutes() )
                + ':' + pad( date.getUTCSeconds() )
                + '.' + String( (date.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
                + 'Z';

            // console.log('MONTH ' + date.getMonth() + ' DATE ' + date.getDate() + ' HOURS ' + date.getHours());
            return t;

        },
        IsNullOrEmpty : function(value)
        {
            if(typeof(value) == 'undefined' || typeof value == null || value == null || value == 'undefined'){
                return true;
            }
            else{
                return false;
            }
        },
        GetURLParameter : function(name) {
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
        },

        GetFileName : function(fullPath)
        {
            var existedFilePath =  fullPath;
            var existedTrimmedFileName = existedFilePath.replace(/^.*(\\|\/|\:)/, '');
            var existedFileExt = existedTrimmedFileName.split('.').pop();
            var existedFileNameWithoutExtension =  existedTrimmedFileName.replace('.' + existedFileExt, '');

            return {

                FileName : existedTrimmedFileName,
                Extension : existedFileExt,
                FileNameWithoutExtension :  existedFileNameWithoutExtension
            }
        } ,

        GetDisplayFileSize : function(bytes)
        {
            // Kilobytes
            if(bytes > 1024 && bytes < 1024*1024)
            {
                return (bytes/1024).toFixed(2) + " KB";
            }

            if(bytes >= 1024*1024 && bytes < 1024*1024*1024)
            {
                return (bytes/1024/1024).toFixed(2) + " MB";
            }

            if(bytes >= 1024*1024*1024)
            {
                return (bytes/1024/1024/1024).toFixed(2) + " GB";
            }

            if(bytes <= 0)
            {
                return "";
            }

            return bytes + " bytes";
        }

    }
});
