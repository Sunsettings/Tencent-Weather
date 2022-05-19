// var careclick = document.getElementsByClassName('each_city')
// for(var i = 0; i < careclick.length; i ++){
//     var care_pro = careclick[i].getAttribute('data-pro');
//     console.log(care_pro);
// }
var delete1 = document.getElementsByClassName('star_delete');
for(var i = 0; i < delete1.length; i ++){
    delete1[i].onclick = function (){
        clearHistory1();
        if(document.getElementsByClassName('city_name') == document.getElementById('fir')){
            care_city.innerHTML = "[添加关注]";
        }
    }
}