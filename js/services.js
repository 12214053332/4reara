var servicesData = window.sessionStorage.getItem("servicesData");
console.log(servicesData);
if(servicesData){
    //$(".loader").show();
    servicesData=JSON.parse(servicesData);
    html="";
    servicesData.forEach(function(item){
        html+='<li><a href="javascript:void(0)"><span><i class="fullscr-nav-icon fas '+item.icon+'"></i></span>'+item.name+'</a><span class="border-shape"></span></li>';
    });
    $(".fullscr-navigation.position-initial ul.list-unstyled").html(html);
}