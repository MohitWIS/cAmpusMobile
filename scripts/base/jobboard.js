var jobData = [];
var cv = "";
var maxchars = 4000;
var comapnyId = "";
var blob;
var formData = new FormData();
var base64ImageContent;
var mloadingGif = "<div class='pdfspinnerdiv' id='mloader'><div class='pdfspinner'><img style='height:60px;width:60px;' src='css/client/images/app_loading_animation.gif' alt='Please Wait'/></div></div>";
function openCity(evt, cityName) {
        $("#jobboardpage").append(mloadingGif);
     $("#testdemo").empty();
     var i, tabcontent, tablinks;
     tabcontent = document.getElementsByClassName("tabcontent");
     for (i = 0; i < tabcontent.length; i++) {
       tabcontent[i].style.display = "none";
     }
     tablinks = document.getElementsByClassName("tablinks");
     for (i = 0; i < tablinks.length; i++) {
       tablinks[i].className = tablinks[i].className.replace(" bctive", "");
     }
     //document.getElementById(cityName).style.display = "block";
     evt.currentTarget.className += " bctive";

        var test = "";
        var IsNearByFilterActive = false;
        if(cityName == "nearMe"){
            IsNearByFilterActive = true;
            navigator.geolocation.getCurrentPosition(onLocationSuccessJob, onLocationError, {
                       enableHighAccuracy: true,
                       timeout: 3000,
                       maximumAge: 3000
            });

            function onLocationSuccessJob(position){
                   try{
                   $("#mloader").remove();
                       var lat = position.coords.latitude;
                       var lng = position.coords.longitude;
                       jobscheckByLocation(lat,lng,true);

                   }catch(e){
                   }
            }

            function  onLocationError(error) {
            $("#mloader").remove();
                jobscheckByLocation(0,0,false);

            }
        }else{
            $("#mloader").remove();
            jobscheckByLocation(0,0,IsNearByFilterActive);
        }



}

function jobscheckByLocation(lat,lng,IsNearByFilterActive){

$("#testdemo").empty();
var test = "";
        coController.coCheckNetworkAvaliable(false, function(ret) {
            if (ret === false || deviceIsOnline === false) {
                msgStr = resources.connectLogin;
                msgTitle = resources.connError;
                msgBtnValue = resources.btnOk;
                var modal = document.getElementById("Confirm_Model");
                $("#boxTitle").empty();
                $("#box-string").empty();
                $("#addbutton").empty();
                $("#boxTitle").html(msgTitle);
                $("#box-string").html(msgStr);
                $("#addbutton").html("<div id='jobscheckByLocation74' class='closeTAPs' style='padding: 10px;text-align: center;background-color: #55c7a6 !important;color: black;margin: 11px;width: 17%;margin-left: 36%;' data-dismiss='modal'>" + msgBtnValue + "</div>");

                modal.style.display = "block";
                $(document).off("vclick", "#jobscheckByLocation74");
                $(document).on("vclick", "#jobscheckByLocation74", function (event) {
                    modal.style.display = "none";
                });
                /*navigator.notification.confirm(msgStr, function() {

                }, msgTitle, msgBtnValue);*/
            }
            else{
                getJobBoard(false,lat,lng,IsNearByFilterActive, function(ret){
                        if(ret == 0){
                            msgTitle = resources.connError;
                            msgBtnValue = resources.btnOk;
                            msgStr = resources.moduleOffline;
                            var modal = document.getElementById("Confirm_Model");
                            $("#boxTitle").empty();
                            $("#box-string").empty();
                            $("#addbutton").empty();
                            $("#boxTitle").html(msgTitle);
                            $("#box-string").html(msgStr);
                            $("#addbutton").html("<div id='getJobBoard97' class='closeTAPs' style='padding: 10px;text-align: center;background-color: #55c7a6 !important;color: black;margin: 11px;width: 17%;margin-left: 36%;' data-dismiss='modal'>" + msgBtnValue + "</div>");

                            $("#mloader").remove();
                            modal.style.display = "block";
                            
                            $(document).off("vclick", "#getJobBoard97");
                            $(document).on("vclick", "#getJobBoard97", function (event) {
                                modal.style.display = "none";
                                goToPage("#coursepage");
                            });
                            /*navigator.notification.confirm(msgStr, function() {
                                $("#mloader").remove();
                                goToPage("#coursepage");
                            }, msgTitle, msgBtnValue);*/
                        }else if(ret.GetJobBoardDetailsListResult.Data == null){
                            msgTitle = resources.connError;
                            msgBtnValue = resources.btnOk;
                            msgStr = resources.moduleOffline;
                            var modal = document.getElementById("Confirm_Model");
                            $("#boxTitle").empty();
                            $("#box-string").empty();
                            $("#addbutton").empty();
                            $("#boxTitle").html(msgTitle);
                            $("#box-string").html(msgStr);
                            $("#addbutton").html("<div id='getJobBoard121' class='closeTAPs' style='padding: 10px;text-align: center;background-color: #55c7a6 !important;color: black;margin: 11px;width: 17%;margin-left: 36%;' data-dismiss='modal'>" + msgBtnValue + "</div>");

                            $("#mloader").remove();
                            modal.style.display = "block";

                            $(document).off("vclick", "#getJobBoard121");
                            $(document).on("vclick", "#getJobBoard121", function (event) {
                                modal.style.display = "none";
                                goToPage("#coursepage");
                            });
                            /*navigator.notification.confirm(msgStr, function() {
                                $("#mloader").remove();
                                goToPage("#coursepage");
                            }, msgTitle, msgBtnValue);*/
                        }else{
                            jobData = [];
                            var jobBoardListField = ret.GetJobBoardDetailsListResult.Data.jobBoardCategoryListField;
                            //alert(lat +'--' + lng);
                            if(lat != 0 && lng != 0 && !ret.GetJobBoardDetailsListResult.Data.isAnyJobInSetRadiousField){
                                test += '<p style=margin:5px;>We don’t have any positions in your area. The closest one to you is:</p>';
                            }
                            for(var i = 0; i<jobBoardListField.length;i++){
                                jobData.push(jobBoardListField[i]);
                                var activeClass = "";
                                var heighMax = "";
                                if(i == 0){
                                    activeClass = "active";
                                    heighMax = "style=max-height:fit-content;"
                                }
                               test += '<button class="collapsibleEclass availableClass '+activeClass+'" style="color:white !important;background-color: #41424C;font-weight: bold;">'+jobBoardListField[i].jobCategoryNameField+'</button>';
                               test += '<div class="content testT" '+heighMax+'>'
                               for(var j=0;j<jobBoardListField[i].jobBoardListField.length;j++){
                                        test += '<div class="eclassesuldiv">';
                                        test += '<img style="float: right;margin-right: 12px;height: 84px;" src='+jobBoardListField[i].jobBoardListField[j].companyLogoField+'>';
                                        test += '<p style="font-weight: bold;padding-left:10px;">'+jobBoardListField[i].jobBoardListField[j].jobTitleField+'</p>';
                                        test += '<div style="padding-left:15px;font-size:0.8em;">';
                                        test += '<p class="catName" style="margin-bottom: 0px;margin-top: 0px;">'+jobBoardListField[i].jobBoardListField[j].jobCategoryNameField+'</p>';
                                        test += '<p class="pound" style="margin-bottom: 0px;margin-top: 5px;">'+jobBoardListField[i].jobBoardListField[j].salaryField+'</p>';
                                        test += '<p class="location" style="margin-bottom: 0px;margin-top: 5px;">'+jobBoardListField[i].jobBoardListField[j].jobCityNameField+','+jobBoardListField[i].jobBoardListField[j].jobCountryNameField+'</p>';
                                        test += '<p class="time" style="margin-bottom: 0px;margin-top: 5px;">'+jobBoardListField[i].jobBoardListField[j].jobTypeNameField+'</p>';
                                        test += '</div>';
                                        test += '<div class="viewDetailsJobBoard" id=viewDetailsJobBoard-'+i+'-'+j+' style="padding: 10px;text-align: center;background-color: #EEBEBE;color: black;margin: 11px;width: 80%;margin-left: 6%;" data-dismiss="modal" translate="">View Details</div>';
                                        test += '<div id=jobDetailsBoard-'+jobBoardListField[i].jobBoardListField[j].jobIDField+'-'+jobBoardListField[i].jobBoardListField[j].categoryIDField+' style="display:none;padding: 16px;font-family:Poppins;" class=jobDetailsBoard-'+i+'-'+j+'><p  style="padding-left:10px;padding-right: 16px;padding-left: 16px;font-size:1em;">'+jobBoardListField[i].jobBoardListField[j].descriptionField+'</p><div class="apply" style="padding: 10px;text-align: center;background-color: #61c8a6;color: black;margin: 11px;width: 80%;margin-left: 6%;" data-dismiss="modal" translate="">Apply</div></div>';
                                        test += '</div>';
                                        test += '<hr>';
                               }
                               test += '</div>';

                            }


                            $("#testdemo").append(test);

                            var coll = document.getElementsByClassName("collapsibleEclass");
                            var i;

                            for (i = 0; i < coll.length; i++) {
                                coll[i].addEventListener("click", function() {
                                    this.classList.toggle("active");
                                    var content = this.nextElementSibling;
                                    if (content.style.maxHeight){
                                    content.style.maxHeight = null;
                                    } else {
                                    content.style.maxHeight = "fit-content";
                                    }
                                });
                            }
                        }
                });
            }
        });


   $(document).off("vclick",".viewDetailsJobBoard");
    $(document).on("vclick",".viewDetailsJobBoard", function(event) {
        event.preventDefault();
        console.log($(this).attr("id"));
        var jobBoardDetailsId = $(this).attr("id");
        var ids = jobBoardDetailsId.split("-");
        var firstNo = ids[1];
        var secondNo = ids[2];
        var hideDeaytisId = ".jobDetailsBoard-"+firstNo+'-'+secondNo;
        if($(hideDeaytisId).css('display') == 'none')
        {
            $(hideDeaytisId).css("display","block");
            $("#"+jobBoardDetailsId).empty();
            $("#"+jobBoardDetailsId).html("Hide Details");
        }
        else{
            $(hideDeaytisId).css("display","none");
            $("#"+jobBoardDetailsId).empty();
            $("#"+jobBoardDetailsId).html("View Details");
        }
    });

    $(document).off("vclick",".apply");
    $(document).on("vclick",".apply", function(event) {
        window.localStorage.removeItem("SingleJob");
        var DisplayData = $(this).parent().attr("id");
        var ids = DisplayData.split("-");
        var jobID = ids[1];
        var category = ids[2];
        $('#sendApplicationID').attr("class",jobID+'-'+category);
        //var myJSON = jobData[firstNo].jobBoardListField[secondNo];
        //var singleJob = JSON.stringify(myJSON);
        //window.localStorage.setItem("SingleJob",singleJob);

        coController.coCheckNetworkAvaliable(false, function(ret) {
                    if (ret === false || deviceIsOnline === false) {
                        msgStr = resources.connectLogin;
                        msgTitle = resources.connError;
                        msgBtnValue = resources.btnOk;
                        var modal = document.getElementById("Confirm_Model");
                        $("#boxTitle").empty();
                        $("#box-string").empty();
                        $("#addbutton").empty();
                        $("#boxTitle").html(msgTitle);
                        $("#box-string").html(msgStr);
                        $("#addbutton").html("<div id='coCheckNetworkAvaliable238' class='closeTAPs' style='padding: 10px;text-align: center;background-color: #55c7a6 !important;color: black;margin: 11px;width: 17%;margin-left: 36%;' data-dismiss='modal'>" + msgBtnValue + "</div>");

                        modal.style.display = "block";
                        $(document).off("vclick", "#coCheckNetworkAvaliable238");
                        $(document).on("vclick", "#coCheckNetworkAvaliable238", function (event) {
                            modal.style.display = "none";
                        });
                        /*navigator.notification.confirm(msgStr, function() {

                        }, msgTitle, msgBtnValue);*/
                    }
                    else{
                        getSingleJob(false,jobID,category, function(ret){
                                console.log(ret);
                                if(ret == 0){
                                    msgTitle = resources.connError;
                                    msgBtnValue = resources.btnOk;
                                    msgStr = resources.moduleOffline;
                                    var modal = document.getElementById("Confirm_Model");
                                    $("#boxTitle").empty();
                                    $("#box-string").empty();
                                    $("#addbutton").empty();
                                    $("#boxTitle").html(msgTitle);
                                    $("#box-string").html(msgStr);
                                    $("#addbutton").html("<div id='getSingleJob262' class='closeTAPs' style='padding: 10px;text-align: center;background-color: #55c7a6 !important;color: black;margin: 11px;width: 17%;margin-left: 36%;' data-dismiss='modal'>" + msgBtnValue + "</div>");

                                    $("#mloader").remove();
                                    modal.style.display = "block";

                                    $(document).off("vclick", "#getSingleJob262");
                                    $(document).on("vclick", "#getSingleJob262", function (event) {
                                        modal.style.display = "none";
                                        goToPage("#jobboardpage");
                                    });
                                    /*navigator.notification.confirm(msgStr, function() {
                                        $("#mloader").remove();
                                        goToPage("#jobboardpage");
                                    }, msgTitle, msgBtnValue);*/
                                }else if(ret.GetJobByIdResult.Data == null){
                                     msgTitle = resources.connError;
                                     msgBtnValue = resources.btnOk;
                                    msgStr = resources.moduleOffline;
                                    var modal = document.getElementById("Confirm_Model");
                                    $("#boxTitle").empty();
                                    $("#box-string").empty();
                                    $("#addbutton").empty();
                                    $("#boxTitle").html(msgTitle);
                                    $("#box-string").html(msgStr);
                                    $("#addbutton").html("<div id='getSingleJob287' class='closeTAPs' style='padding: 10px;text-align: center;background-color: #55c7a6 !important;color: black;margin: 11px;width: 17%;margin-left: 36%;' data-dismiss='modal'>" + msgBtnValue + "</div>");

                                    $("#mloader").remove();
                                    modal.style.display = "block";

                                    $(document).off("vclick", "#getSingleJob287");
                                    $(document).on("vclick", "#getSingleJob287", function (event) {
                                        modal.style.display = "none";
                                        goToPage("#jobboardpage");
                                    });
                                     /*navigator.notification.confirm(msgStr, function() {
                                         $("#mloader").remove();
                                         goToPage("#jobboardpage");
                                     }, msgTitle, msgBtnValue);*/
                                }else{
                                    goToPage("#jobApplyPage");
                                    var GetJobByIdResult = ret.GetJobByIdResult.Data;
                                    comapnyId = GetJobByIdResult.companyContactIDField;
                                    $(".JobtITLE").empty();
                                    $(".catName").empty();
                                    $(".pound").empty();
                                    $(".location").empty();
                                    $("#reviewCoverL").empty();
                                    $("#reviewCV").empty();
                                    $(".time").empty();
                                    $("#uploadedCV").empty();
                                    $("#jobDetails").empty();
                                    $("#reviewCV").css("display","none");
                                    $(".impostFile").css("display","block");

                                    $(".cvLIST").css("display","block");
                                    $(".editApplication").css("display","none");
                                    $(".reviewApplication").css("display","block");
                                    $("#w3review").css("display","block");
                                    $(".checkCLlen").css("display","block");
                                    $("#uploadedCV").css("display","none");
                                    $("#text-limit").css("display","block");
                                    $("#reviewCoverL").css("display","none");
                                    $("#sendApplicationID").css("display","none");
                                        $("#reviewCoverL").empty();
                                    var Id = $('.reviewApplication').attr('id');
                                    if(Id == undefined && cv == ""){
                                            $(".ifnocv").css("display","none");
                                    }

                                    var text2 = $("#w3review").val();
                                    if(text2 == ""){
                                        $(".ifnocl").css("display","none");
                                    }
                                    $('#w3review').val('');
                                    $('#ExistingCV').empty();
                                    $("#remain").empty();

                                    $("#remain").append("4000");
                                    $(".JobtITLE").append(GetJobByIdResult.jobTitleField);
                                    $(".catName").append(GetJobByIdResult.jobCategoryNameField);
                                    $(".pound").append(GetJobByIdResult.salaryField);
                                    $(".location").append(GetJobByIdResult.jobCityNameField +',' + GetJobByIdResult.jobCountryNameField);
                                    $(".time").append(GetJobByIdResult.jobTypeNameField);
                                    $("#jobDetails").append(GetJobByIdResult.descriptionField);
                                    document.getElementById('compImg').setAttribute('src',GetJobByIdResult.companyLogoField);
                                    if(GetJobByIdResult.isCvUploadedField){
                                        base64ImageContent = "";
                                        $(".collapsibleJobClass").css("display","block");
                                        $("#ExistingCV").css("display","block");
                                        var newCV = '<li data-theme="h" class="alreadyUploaded ui-bar-h clientheader ui-li ui-li-divider ui-first-child" style="padding: 4px 0px 5px 9px;background: #EEBEBE !important;min-height: 32px;"><div class="bookingdateheadNew" style="width:97% !important; color: black;white-space: normal !important;font-size:15px;font-weight: normal;margin-top: 6px;">my_CV.pdf</div></li>';
                                        $("#ExistingCV").append(newCV);
                                    }else{
                                        $("#ExistingCV").css("display","none");
                                        $(".collapsibleJobClass").css("display","none");
                                    }
                                }

                        });
                    }
        });

        //$(".eclassbookbtn").off("vclick");
                $(document).off("vclick",".alreadyUploaded");
                $(document).on("vclick",".alreadyUploaded", function(event) {
                    console.log(activeUser.userId);
                    var linkCv = "http://studentdesktop.eteacher.pro/data/GetCV.aspx?UId="+activeUser.userId;
                    androidPDFView(linkCv);
                });

    });

}

$(document).off("vclick",".apply");
$(document).on("vclick",".apply", function(event) {
    goToPage("#jobApplyPage");
});

function importData() {
  let input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/pdf';
  input.onchange = _ => {
    // you can use this method to get file and perform respective operations
           let file =   input.files[0];
           var reader = new FileReader();
           reader.readAsDataURL(file);
           reader.onload = function () {
             console.log(reader.result);
             cv = reader.result;
             base64ImageContent = cv.replace('data:application/pdf;base64,', "");
             //blob = base64ToBlob(base64ImageContent, 'image/png');
             //blob = b64toBlob1(base64ImageContent,'image/png')
             //formData = new FormData();
             //formData.append('picture', blob);
             $("#uploadSuccs").css("display","block");
             $(".CVname").html('Remove '+file.name);
             $('.removeCV').attr("id",file.name);
             $('.keepCV').attr("id",file.name);
             $('.reviewApplication').attr("id",file.name);
             $(".impostFile").css("display","none");
           };
           reader.onerror = function (error) {
             console.log('Error: ', error);
           };
        };
  input.click();

}


function b64toBlob1(b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

/*function base64ToBlob(base64, mime)
{
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
        var slice = byteChars.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: mime});
}*/

$(".viewDetailsJobBoard").off("vclick");
$(".viewDetailsJobBoard").on("vclick", function(event) {
    if($('#jobDetails').css('display') == 'none')
    {
        $("#jobDetails").css("display","block");
        $(".viewDetailsJobBoard").empty();
        $(".viewDetailsJobBoard").html("Hide Details");
    }
    else{
        $("#jobDetails").css("display","none");
        $(".viewDetailsJobBoard").empty();
        $(".viewDetailsJobBoard").html("View Details");
    }

});


$('#getCV').change(function () {
    var file = this.files[0]; // FileList object
    var reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onload = function () {
         console.log(reader.result);
         cv = reader.result;
       };
       reader.onerror = function (error) {
         console.log('Error: ', error);
       };
});




$(".removeCV").off("vclick");
$(".removeCV").on("vclick", function(event) {
    var idimg = $(this).attr("id");
    $("#uploadSuccs").css("display","none");
    $(".impostFile").css("display","block");
});

$(".keepCV").off("vclick");
$(".keepCV").on("vclick", function(event) {
    var idimg = $(this).attr("id");
    $("#uploadSuccs").css("display","none");
    $(".newCV").css("display","block");
    $(".newCV").html(idimg);
    $('#ExistingCV').empty();
    //var newCV = '<li data-theme="h" class="ui-bar-h clientheader ui-li ui-li-divider ui-first-child" style="padding: 4px 0px 5px 9px;background: #EEBEBE !important;min-height: 32px;"><div class="bookingdatehead" style="color: black;white-space: normal !important;font-size:15px;font-weight: normal;margin-top: 6px;">'+idimg+'</div></li>';
    //$("#ExistingCV").append(newCV);
    $("#uploadedCV").append(idimg);
    $("#uploadedCV").css("display","block");
    $(".impostFile").css("display","block");
});

$(".reviewApplication").off("vclick");
$(".reviewApplication").on("vclick", function(event) {
    event.preventDefault();
    var idimg = $(this).attr("id");
    $("#reviewCV").css("display","block");
    if(idimg == undefined && cv != ""){
        $("#reviewCV").html("my_CV.pdf");
    }else{
        $("#reviewCV").html(idimg);
    }

    if(idimg == undefined && cv == ""){
        $(".ifnocv").css("display","block");
    }
    $(".impostFile").css("display","none");
    $(".collapsibleJobClass").css("display","none");
    $(".cvLIST").css("display","none");
    $(".editApplication").css("display","block");
    $(".reviewApplication").css("display","none");
    $("#w3review").css("display","none");
    $(".checkCLlen").css("display","none");
    $("#text-limit").css("display","none");
     $("#uploadedCV").css("display","none");
    $("#reviewCoverL").css("display","block");
    $("#sendApplicationID").css("display","block");
    var text2 = $("#w3review").val();
    $("#reviewCoverL").append(text2);
    if(text2 == ""){
        $(".ifnocl").css("display","block");
    }
});

$("#editApplicationID").off("vclick");
$("#editApplicationID").on("vclick", function(event) {
    event.preventDefault();
    $("#reviewCV").css("display","none");
    $(".impostFile").css("display","block");
    $(".collapsibleJobClass").css("display","none");
    $("#ExistingCV").css("display","none");
    $(".cvLIST").css("display","block");
    $(".editApplication").css("display","none");
    $(".reviewApplication").css("display","block");
    $("#w3review").css("display","block");
    $(".checkCLlen").css("display","block");
    $("#uploadedCV").css("display","block");
    $("#text-limit").css("display","block");
    $("#reviewCoverL").css("display","none");
    $("#sendApplicationID").css("display","none");
    var checkCV = $('.alreadyUploaded').html();
    if(checkCV != undefined){
        $(".collapsibleJobClass").css("display","block");
        $("#ExistingCV").css("display","block");
    }
        $("#reviewCoverL").empty();
    var Id = $('.reviewApplication').attr('id');
    if(Id == undefined && cv == ""){
            $(".ifnocv").css("display","none");
    }

    var text2 = $("#w3review").val();
    if(text2 == ""){
        $(".ifnocl").css("display","none");
    }
});

$("#sendApplicationID").off("vclick");
$("#sendApplicationID").on("vclick", function(event) {
    var jobBoardDetailsId = $(this).attr("class");
    var ids = jobBoardDetailsId.split("-");
    var jobId = ids[0];
    var CatId = ids[1];
    var subject = $(".JobtITLE").text();
    var coverLetter = $("#w3review").val();

    //alert("JobId---  "+jobId +'   --- CompanyContactId =   '+ comapnyId +' --- EmailSubject -- '+subject +' --- EmailCover= '+coverLetter + ' ---- cv-- '+base64ImageContent);
    coController.coCheckNetworkAvaliable(false, function(ret) {
            if (ret === false || deviceIsOnline === false) {
                msgStr = resources.connectLogin;
                msgTitle = resources.connError;
                msgBtnValue = resources.btnOk;
                var modal = document.getElementById("Confirm_Model");
                $("#boxTitle").empty();
                $("#box-string").empty();
                $("#addbutton").empty();
                $("#boxTitle").html(msgTitle);
                $("#box-string").html(msgStr);
                $("#addbutton").html("<div id='sendApplicationID601' class='closeTAPs' style='padding: 10px;text-align: center;background-color: #55c7a6 !important;color: black;margin: 11px;width: 17%;margin-left: 36%;' data-dismiss='modal'>" + msgBtnValue + "</div>");

                modal.style.display = "block";
                $(document).off("vclick", "#sendApplicationID601");
                $(document).on("vclick", "#sendApplicationID601", function (event) {
                    modal.style.display = "none";
                });
                /*navigator.notification.confirm(msgStr, function() {

                }, msgTitle, msgBtnValue);*/
            }
            else{
                saveJOB(false,jobId,comapnyId,subject,coverLetter,base64ImageContent, function(ret){
                    if(ret == -1){
                        msgStr = resources.connectLogin;
                        msgTitle = resources.connError;
                        msgBtnValue = resources.btnOk;
                        var modal = document.getElementById("Confirm_Model");
                        $("#boxTitle").empty();
                        $("#box-string").empty();
                        $("#addbutton").empty();
                        $("#boxTitle").html(msgTitle);
                        $("#box-string").html(msgStr);
                        $("#addbutton").html("<div id='saveJOB611' class='closeTAPs' style='padding: 10px;text-align: center;background-color: #55c7a6 !important;color: black;margin: 11px;width: 17%;margin-left: 36%;' data-dismiss='modal'>" + msgBtnValue + "</div>");

                        modal.style.display = "block";
                        $(document).off("vclick", "#saveJOB611");
                        $(document).on("vclick", "#saveJOB611", function (event) {
                            modal.style.display = "none";
                        });
                        /*navigator.notification.confirm(msgStr, function() {

                        }, msgTitle, msgBtnValue);*/
                    }
                    else if(ret.SendJobApplicationResult){
                        msgStr = resources.jobApplicationSuccess;
                        msgTitle = resources.jobApplication;
                        msgBtnValue = resources.btnOk;
                        var modal = document.getElementById("Confirm_Model");
                        $("#boxTitle").empty();
                        $("#box-string").empty();
                        $("#addbutton").empty();
                        $("#boxTitle").html(msgTitle);
                        $("#box-string").html(msgStr);
                        $("#addbutton").html("<div id='saveJOB631' class='closeTAPs' style='padding: 10px;text-align: center;background-color: #55c7a6 !important;color: black;margin: 11px;width: 17%;margin-left: 36%;' data-dismiss='modal'>" + msgBtnValue + "</div>");

                        modal.style.display = "block";
                        $(document).off("vclick", "#saveJOB631");
                        $(document).on("vclick", "#saveJOB631", function (event) {
                            modal.style.display = "none";
                            goToPage("#jobboardpage");
                        });
                        /*navigator.notification.confirm(msgStr, function() {
                            goToPage("#jobboardpage");
                        }, msgTitle, msgBtnValue);*/
                    }
                })
            }
    });
});

$("#w3review").off("keyup");
$("#w3review").on("keyup", function(event) {
    var tlength = $(this).val().length;
    $(this).val($(this).val().substring(0, maxchars));
    var tlength = $(this).val().length;
    remain = maxchars - parseInt(tlength);
    $('#remain').text(remain);
});