var care_city = document.getElementsByClassName('add_care')[0];
var defaupro = document.getElementById('fir').innerHTML;
var defaucity = document.getElementById('sec').innerHTML;
var arr = [];
arr.push(defaupro);
arr.push(defaucity);
if(localStorage.care != undefined){
comp(arr,localStorage.care);
}

care_city.onmouseover = function(){
    if(care_city.innerHTML == "[添加关注]"){
    care_city.style.color = 'white';
    care_city.style.cursor = "pointer";
    }else{
        care_city.style.color = 'rgba(255, 255, 255, 0.6)';
        care_city.style.cursor = "default";
    } 
}
care_city.onmouseout = function(){
    care_city.style.color = 'rgba(255, 255, 255, 0.6)';
}

function comp(com1,com2){
    if(com1.length == 3){
        var my1 = com1[1].replace(/\s*/g,"");
        var my2 = com1[2].replace(/\s*/g,"");
        if(com2.search(com1[0]) != -1 && com2.search(my1) != -1 && com2.search(my2) != -1){
            document.getElementsByClassName('add_care')[0].innerHTML = "[已关注]";
            console.log("yes1");
            care_city.onmouseover = function(){
                if(care_city.innerHTML == "[添加关注]"){
                care_city.style.color = 'white';
                care_city.style.cursor = "pointer";
                }else{
                    care_city.style.color = 'rgba(255, 255, 255, 0.6)';
                    care_city.style.cursor = "default";
                } 
            }
        }else{
            document.getElementsByClassName('add_care')[0].innerHTML = "[添加关注]";
            console.log("no1");
            care_city.onmouseover = function(){
                if(care_city.innerHTML == "[添加关注]"){
                care_city.style.color = 'white';
                care_city.style.cursor = "pointer";
                }else{
                    care_city.style.color = 'rgba(255, 255, 255, 0.6)';
                    care_city.style.cursor = "default";
                } 
            }

        }
    }else{
        var my1 = com1[1].replace(/\s*/g,"");
        if(com2.search(com1[0]) != -1 && com2.search(my1) != -1){
            document.getElementsByClassName('add_care')[0].innerHTML = "[已关注]";
            care_city.onmouseover = function(){
                if(care_city.innerHTML == "[添加关注]"){
                care_city.style.color = 'white';
                care_city.style.cursor = "pointer";
                }else{
                    care_city.style.color = 'rgba(255, 255, 255, 0.6)';
                    care_city.style.cursor = "default";
                } 
            }
        }else{
            document.getElementsByClassName('add_care')[0].innerHTML = "[添加关注]";
            care_city.onmouseover = function(){
                if(care_city.innerHTML == "[添加关注]"){
                care_city.style.color = 'white';
                care_city.style.cursor = "pointer";
                }else{
                    care_city.style.color = 'rgba(255, 255, 255, 0.6)';
                    care_city.style.cursor = "default";
                } 
            }
        }
    }
}

function comp1(com1,com2){
        var my1 = com1.pro.replace(/\s*/g,"");
        var my2 = com1.city.replace(/\s*/g,"");
        if(com2.search(my1) != -1 && com2.search(my2) != -1){
            document.getElementsByClassName('add_care')[0].innerHTML = "[已关注]";
            care_city.onmouseover = function(){
                if(care_city.innerHTML == "[添加关注]"){
                care_city.style.color = 'white';
                care_city.style.cursor = "pointer";
                }else{
                    care_city.style.color = 'rgba(255, 255, 255, 0.6)';
                    care_city.style.cursor = "default";
                } 
            }
        }else{
            document.getElementsByClassName('add_care')[0].innerHTML = "[添加关注]";
            care_city.onmouseover = function(){
                if(care_city.innerHTML == "[添加关注]"){
                care_city.style.color = 'white';
                care_city.style.cursor = "pointer";
                }else{
                    care_city.style.color = 'rgba(255, 255, 255, 0.6)';
                    care_city.style.cursor = "default";
                } 
            }
        }
}