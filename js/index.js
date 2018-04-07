/*
var keyName = window.sessionStorage.key(0); //Get key name
window.sessionStorage.setItem("key", "value"); //Set item
var value = window.sessionStorage.getItem("key");// Get item
window.sessionStorage.removeItem("key"); //Remove Item
window.sessionStorage.clear();//Clear storage
*/
//  window.sessionStorage.clear();
var userData = window.sessionStorage.getItem("userData")
console.log(userData);

var errorMessages={
    "email_exist":"The Email Is Already Exist",
    "phone_exist":"The Phone Is Already Exist",
    "success":"Your Operation is success",
    "wrong_phone_or_password":"Wrong Phone Or Password",
    "user_not_active":"This User Not Active ",
};
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};
includeHTML();
//the url of api requests
var APIURL="http://4reara.almoasherbiz.com/ForeraaAPI/";

//create route request url
function makeURL(route){
    return APIURL+route;
}

function getMessages(response,element){
    html='<div class="alert '+((response.success)?'alert-success':'alert-danger')+'">';
    message=response.message;
    if(message.length==1){
        html+=errorMessages[message[0]]+'</div>';
        $(element).html(html);
        return'';
    }
    html+='<ul>';
    if(Array.isArray(message)){
       message.forEach(function(item){
          html+='<li>'+errorMessages[item]+'</li>'
       })
    }
    html+='</ul></div>';
    $(element).html(html);
}
// Device Event Listener
$(document).ready(function(){
    document.addEventListener("deviceready",onDeviceReady,false);
});

function updateStatusCallback(response) {
    if(response.status==='connected'){
        console.log('you are connected');
    }else if(response.status==='not_authorized'){
        console.log('you are not authorized');
    }else{
        console.log('you are not authorized and not login');
    }
}
function onDeviceReady() {
    console.log('Device Is Ready');
    $(document).on('click',"#fb_login",facebookLogin);
    $(document).on('submit',"#register-form",function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: makeURL('foreraa_users'),
            data: $("#register-form").serialize(),
            success: function (msg) {
                getMessages(msg,"#response")
                if(msg.success){
                    $("#register-form #social").val('no');
                    $("#register-form")[0].reset();
                }
            }
        });
    });
    $(document).on('submit',"#login-form",function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: makeURL('foreraa_users/login'),
            data: $("#login-form").serialize(),
            success: function (msg) {
                getMessages(msg,"#response")
                if(msg.success){
                    window.sessionStorage.setItem("userData", JSON.stringify(msg.result));
                }
            }
        });
    })
}
function facebookLogin(){
    FB.login(function(response){
        if(response.status=='connected'){
            //console.log("facebookLogin",response);
            getFacebookData();
        }
    },{scope:'email,public_profile,user_location'});
}
function getFacebookData() {
    FB.api('/me?fields=id,name,email',function(response){
        //console.log("getFacebookData",response);
        $("#register-form #social").val('facebook');
        $("#register-form #name").val(response.name);
        $("#register-form #email").val(response.email);
    });
}
