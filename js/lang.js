

$(document).ready(function(){

    /*console.log(localStorage.getItem("lang"));
    var imported = document.createElement('script');
    if(localStorage.getItem("lang")=="ar"){
        // alert(localStorage.getItem("lang"));
        console.log("middle ar");
        imported.src = 'lang/ar.js';
        document.head.appendChild(imported);

    }
    else if(localStorage.getItem("lang")=="en"){
        // alert(localStorage.getItem("lang"));
        //var imported = document.createElement('script');
        console.log("middle en");
        imported.src = 'lang/en.js';
        document.head.appendChild(imported);

    }else{
        imported.src = 'lang/en.js';
        document.head.appendChild(imported);

    }
    console.log("end ",localStorage.getItem("lang"));*/

    function translate(lang){
        $("[trans-lang-html]").each(function () {
            console.log(window["strings"+lang][$(this).attr('trans-lang-html')]);
            $(this).html(window["strings"+lang][$(this).attr('trans-lang-html')]);
            $(this).removeAttr('trans-lang-html')
        })
        $("[trans-lang-placeholder]").each(function () {
            console.log(window["strings"+lang][$(this).attr('trans-lang-placeholder')]);
            $(this).attr('placeholder', window["strings"+lang][$(this).attr('trans-lang-placeholder')]);
            $(this).removeAttr('trans-lang-placeholder')
        });
    }

    if(localStorage.getItem("lang")=="ar"){
        translate("");
    }else if(localStorage.getItem("lang")=="en")
    {
        translate("_en");
    }

});