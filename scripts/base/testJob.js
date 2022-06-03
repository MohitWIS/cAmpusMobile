/*alert("in")
var jobData = [];
function openCity(evt, cityName) {
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
                       var lat = position.coords.latitude;
                       var lng = position.coords.longitude;
                       jobscheckByLocation(lat,lng,true);
                   }catch(e){
                   }
            }

            function  onLocationError(error) {
                jobscheckByLocation(0,0,false);
            }
        }else{
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
                navigator.notification.confirm(msgStr, function() {

                }, msgTitle, msgBtnValue);
            }
            else{
                getJobBoard(false,lat,lng,IsNearByFilterActive, function(ret){
                        if(ret == 0){
                            msgTitle = resources.connError;
                            msgBtnValue = resources.btnOk;
                            msgStr = resources.moduleOffline;
                            navigator.notification.confirm(msgStr, function() {
                                $("#mloader").remove();
                                goToPage("#coursepage");
                            }, msgTitle, msgBtnValue);
                        }else if(ret.GetJobBoardDetailsListResult.Data == null){
                            msgTitle = resources.connError;
                            msgBtnValue = resources.btnOk;
                            msgStr = resources.moduleOffline;
                            navigator.notification.confirm(msgStr, function() {
                                $("#mloader").remove();
                                goToPage("#coursepage");
                            }, msgTitle, msgBtnValue);
                        }else{
                            jobData = [];
                            var jobBoardListField = ret.GetJobBoardDetailsListResult.Data;
                            for(var i = 0; i<jobBoardListField.length;i++){
                                jobData.push(jobBoardListField[i]);
                               test += '<button class="collapsibleEclass availableClass" style="color:white !important;background-color: #41424C;font-weight: bold;">'+jobBoardListField[i].jobCategoryNameField+'</button>';
                               test += '<div class="content testT">'
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
        $('#sendApplicationID').attr("class",'application-'jobID+'-'+category);
        //var myJSON = jobData[firstNo].jobBoardListField[secondNo];
        //var singleJob = JSON.stringify(myJSON);
        //window.localStorage.setItem("SingleJob",singleJob);

        coController.coCheckNetworkAvaliable(false, function(ret) {
                    if (ret === false || deviceIsOnline === false) {
                        msgStr = resources.connectLogin;
                        msgTitle = resources.connError;
                        msgBtnValue = resources.btnOk;
                        navigator.notification.confirm(msgStr, function() {

                        }, msgTitle, msgBtnValue);
                    }
                    else{
                        getSingleJob(false,jobID,category, function(ret){
                                console.log(ret);
                                if(ret == 0){
                                    msgTitle = resources.connError;
                                    msgBtnValue = resources.btnOk;
                                    msgStr = resources.moduleOffline;
                                    navigator.notification.confirm(msgStr, function() {
                                        $("#mloader").remove();
                                        goToPage("#jobboardpage");
                                    }, msgTitle, msgBtnValue);
                                }else if(ret.GetJobByIdResult.Data == null){
                                     msgTitle = resources.connError;
                                     msgBtnValue = resources.btnOk;
                                     msgStr = resources.moduleOffline;
                                     navigator.notification.confirm(msgStr, function() {
                                         $("#mloader").remove();
                                         goToPage("#jobboardpage");
                                     }, msgTitle, msgBtnValue);
                                }else{
                                    goToPage("#jobApplyPage");
                                    var GetJobByIdResult = ret.GetJobByIdResult.Data;
                                    $(".JobtITLE").append(GetJobByIdResult.jobTitleField);
                                    $(".catName").append(GetJobByIdResult.jobCategoryNameField);
                                    $(".pound").append(GetJobByIdResult.salaryField);
                                    $(".location").append(GetJobByIdResult.jobCityNameField +',' + GetJobByIdResult.jobCountryNameField);
                                    $(".time").append(GetJobByIdResult.jobTypeNameField);
                                    $("#jobDetails").append(GetJobByIdResult.descriptionField);
                                    document.getElementById('compImg').setAttribute('src',GetJobByIdResult.companyLogoField);
                                    if(GetJobByIdResult.cvField != ""){

                                        var newCV = '<li data-theme="h" class="ui-bar-h clientheader ui-li ui-li-divider ui-first-child" style="padding: 4px 0px 5px 9px;background: #EEBEBE !important;min-height: 32px;"><div class="bookingdatehead" style="color: black;white-space: normal !important;font-size:15px;font-weight: normal;margin-top: 6px;">Already have CV</div></li>';
                                        $("#ExistingCV").append(newCV);
                                    }
                                }

                        });
                    }
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
  input.onchange = _ => {
    // you can use this method to get file and perform respective operations
           let file =   input.files[0];
           var reader = new FileReader();
           reader.readAsDataURL(file);
           reader.onload = function () {
             console.log(reader.result);
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
    var newCV = '<li data-theme="h" class="ui-bar-h clientheader ui-li ui-li-divider ui-first-child" style="padding: 4px 0px 5px 9px;background: #EEBEBE !important;min-height: 32px;"><div class="bookingdatehead" style="color: black;white-space: normal !important;font-size:15px;font-weight: normal;margin-top: 6px;">'+idimg+'</div></li>';
    $("#ExistingCV").append(newCV);
    $(".impostFile").css("display","block");
});

$(".reviewApplication").off("vclick");
$(".reviewApplication").on("vclick", function(event) {
    event.preventDefault();
    var idimg = $(this).attr("id");
    $("#reviewCV").css("display","block");
    $("#reviewCV").html(idimg);
    $(".impostFile").css("display","none");
    $(".collapsibleJobClass").css("display","none");
    $(".cvLIST").css("display","none");
    $(".editApplication").css("display","block");
    $(".reviewApplication").css("display","none");
    $("#w3review").css("display","none");
    $("#text-limit").css("display","none");
    $("#reviewCoverL").css("display","block");
    $("#sendApplicationID").css("display","block");
    var text2 = $("#w3review").val();
    $("#reviewCoverL").append(text2);
});

$("#editApplicationID").off("vclick");
$("#editApplicationID").on("vclick", function(event) {
    event.preventDefault();
    $("#reviewCV").css("display","none");
    $(".impostFile").css("display","block");
    $(".collapsibleJobClass").css("display","block");
    $(".cvLIST").css("display","block");
    $(".editApplication").css("display","none");
    $(".reviewApplication").css("display","block");
    $("#w3review").css("display","block");
    $("#text-limit").css("display","block");
    $("#reviewCoverL").css("display","none");
    $("#sendApplicationID").css("display","none");
        $("#reviewCoverL").empty();
});*/