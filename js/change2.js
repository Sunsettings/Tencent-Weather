
function setHistoryItems1(keyword) {
    let {
        care
    } = localStorage;
    if (care === undefined) {
        localStorage.care = keyword;
    } else {
        var onlyItem = care.split(';').filter(e => e != keyword);
        if (onlyItem.length > 0) {
            care = keyword + ';' + onlyItem.slice(0, 4).join(';');
        }
        localStorage.care = care;
    }
}
function clearHistory1() {
    document.getElementsByClassName('cities')[0].innerHTML = "";
    care_city.innerHTML = '[添加关注]';
    localStorage.removeItem('care');
    // window.location.reload();
}
function setHistory1(keyword) {
    setHistoryItems1(keyword);
    // window.location.reload();
}


var care_city = document.getElementsByClassName("add_care")[0];

var str3 = localStorage.care;
if (str3 != undefined) {
    var strArr = new Array();
    strArr = str3.split(";");
    var htmlTxt1 = '';
    for (var i = 0; i < strArr.length; i++) {
        var trans = JSON.parse(strArr[i]);
        if (trans.county == undefined) {
            htmlTxt1 += '<li data-pro="' + trans.pro + '"data-city="' + trans.city + '" class="each_city"><div class="city_name">' + trans.city + '</div><div class="set_default" style="display:none;">设为默认</div><div class="weather_status"><img src="./images/' + trans.code + '.png">' + trans.wea + '</div><div class="temp_range">' + trans.tempaure + '</div><a href="javascript:" class="star_delete"></a></li>';
        } else {
            htmlTxt1 += '<li data-pro="' + trans.pro + '"data-city="' + trans.city + '" class="each_city"><div class="city_name">' + trans.city + '</div><div class="set_default" style="display:none;">设为默认</div><div class="weather_status"><img src="./images/' + trans.code + '.png">' + trans.wea + '</div><div class="temp_range">' + trans.tempaure + '</div><a href="javascript:" class="star_delete"></a></li>';
        }
    }
    document.getElementsByClassName("cities")[0].innerHTML = htmlTxt1;
    // var myul = document.getElementById('myul');
    // myul.innerHTML = htmlTxt;
    // myul.appendChild(newli);
    // newli,innerHTML = htmlTxt;
}

care_city.onclick = function (){
    if(care_city.innerHTML == "[添加关注]"){
        care_city.innerHTML = "[已关注]";
        var fir = document.getElementById('fir');
        var sec = document.getElementById('sec');
        if(sec.innerHTML != ''){
            var x = sec.innerHTML.replace(/\s*/g,"");
            pro = fir.innerHTML;
        }
        var mypro = fir.getAttribute('pro');
        
        jsonp ({
            url: 'https://wis.qq.com/weather/common',
            data: {
                source: 'pc',
                weather_type: 'observe',
                // weather_type: 'forecast_1h|forecast_24h',
                province: mypro,
                city: x,
                county : y
            },
            success: function (data) {
                var get_wea = data.data.observe.weather;
                var get_code = data.data.observe.weather_code;
                var get_tem = data.data.observe.degree;
                var proci = {
                    pro : mypro,
                    city : x,
                    county : y,
                    code : get_code,
                    wea : get_wea,
                    tempaure : get_tem
                };
                var prociv = JSON.stringify(proci);
                setHistory1(prociv);
                var str2 = localStorage.care;
                if (str2 != undefined) {
                    var strArr = new Array();
                    strArr = str2.split(";");
                    var htmlTxt1 = '';
                    for (var i = 0; i < strArr.length; i++) {
                        var trans = JSON.parse(strArr[i]);
                        console.log(trans);
                        if (trans.county == undefined) {
                            htmlTxt1 += '<li data-pro="' + trans.pro + '"data-city="' + trans.city + '" class="each_city"><div class="city_name">' + trans.city + '</div><div class="set_default" style="display:none;">设为默认</div><div class="weather_status"><img src="./images/' + trans.code + '.png">' + trans.wea  + '</div><div class="temp_range">' + trans.tempaure + '</div><a href="javascript:" class="star_delete" onclick="clearHistory1()"></a></li>';
                        } else {
                            htmlTxt1 += '<li data-pro="' + trans.pro + '"data-city="' + trans.city + '" class="each_city"><div class="city_name">' + trans.city + '</div><div class="set_default" style="display:none;">设为默认</div><div class="weather_status"><img src="./images/' + trans.code + '.png">' + trans.wea  + '</div><div class="temp_range">' + trans.tempaure + '</div><a href="javascript:" class="star_delete" onclick="clearHistory1()"></a></li>';
                        }
                    }
                    document.getElementsByClassName("cities")[0].innerHTML = htmlTxt1;
                }

            }
        })

    }
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

for(var i = 0; i < his_city.length; i++){
    let ii = i;
    his_city[ii].onclick = function (){
        var fir = document.getElementById('fir');
        var sec = document.getElementById('sec');
        var x = his_city[ii].getAttribute('data-city');
        var mypro = his_city[ii].getAttribute('data-province');
        var y = '';
        
        if(his_city[ii].getAttribute('data-county') != undefined) {
            fir.innerHTML = x;
            sec.innerHTML = his_city[ii].getAttribute('data-county');
        }else if(x != mypro){
            fir.innerHTML = mypro;
            sec.innerHTML = x;
        }else{
            fir.innerHTML = mypro;
            sec.innerHTML = "";
        }

        jsonp ({
            url: 'https://wis.qq.com/weather/common',
            data: {
                source: 'pc',
                weather_type: 'observe',
                // weather_type: 'forecast_1h|forecast_24h',
                province: mypro,
                city: x,
                county: y
            },
            success: function (data) {
                var a = document.getElementsByClassName('temp')[0];
                a.innerHTML = data.data.observe.degree + '°';
                
                var time1 = document.getElementsByClassName('data_resourse')[0];
                var date = data.data.observe.update_time;
                var hour =date.substr(8, 2);
                var minute = date.substr(10, 2);
                time1.innerHTML = '中央气象台' + hour + ':' + minute + '发布';
        
                var wea1_my = document.getElementsByClassName('wea_sta')[0];
                var wea1 = data.data.observe.weather;
                wea1_my.innerHTML = wea1;
        
                var wea_dir_my = document.getElementsByClassName('wind')[0];
                var wea_nu = data.data.observe.wind_direction;
                var wea3 = data.data.observe.wind_power;
                switch (wea_nu) 
                { 
                  case "0":wea_dir = "无持续风向";
                  document.getElementsByClassName('wind')[0].firstElementChild.style.backgroundPositionY = "-191px";
                  break;  
                  case "1":wea_dir = "东北风";
                  break; 
                  case "2":wea_dir = "东风"; 
                  break; 
                  case "3":wea_dir = "东南风"; 
                  break; 
                  case "4":wea_dir = "南风"; 
                  break; 
                  case "5":wea_dir = "西南风"; 
                  break; 
                  case "6":wea_dir = "西风"; 
                  break; 
                  case "7":wea_dir = "西北风"; 
                  break;
                  case "8":wea_dir = "北风";
                  break;
                }
                wea_dir_my.lastElementChild.innerHTML = wea_dir + ' ' + wea3 + '级';
        
                var wea_wet_my = document.getElementsByClassName('humidity')[0];
                var wea_hu = data.data.observe.humidity;
                wea_wet_my.lastElementChild.innerText = '湿度' + ' ' + wea_hu + '%';
        
                var wea_pre_my = document.getElementsByClassName('pressure')[0];
                var wea_pre = data.data.observe.pressure;
                wea_pre_my.lastElementChild.innerText = '气压' + ' ' + wea_pre + 'hPa';
        
                var wea_icon = document.getElementById('big_icon');
                var wea_icon_nu = data.data.observe.weather_code;
                wea_icon.src = "./imagee/" + wea_icon_nu + ".png";
            }
        })
        
        jsonp ({
            url: 'https://wis.qq.com/weather/common',
            data: {
                source: 'pc',
                weather_type: 'air',
                // weather_type: 'forecast_1h|forecast_24h',
                province: mypro,
                city: x,
                county: y
            },
            success: function (data) {
                var air = document.getElementsByClassName('air')[0].lastElementChild;
                var air_text1 = data.data.air.aqi;
                var air_text2 = data.data.air.aqi_name;
                air.innerHTML = air_text1 + " " + air_text2;
            }
        })
        
        jsonp ({
            url: 'https://wis.qq.com/weather/common',
            data: {
                source: 'pc',
                weather_type: 'forecast_1h',
                // weather_type: 'forecast_1h|forecast_24h',
                province: mypro,
                city: x,
                county: y
            },
            success: function (data) {
                var time_info = document.getElementsByClassName('info_title');
                var img_icon = document.getElementsByClassName('info_icon');
                var temp_info = document.getElementsByClassName('info_temp');
                function changeStyle(day) {
                    var hour = day.substr(8, 2);
                    var minute = day.substr(10, 2);
                    return hour + ':' + minute;
                }
                for(var i = 0; i<24; ++i){
                    var time_h = data.data.forecast_1h[i].update_time;
                    var time_ch = changeStyle(time_h);
                    time_info[i].innerHTML = time_ch;
        
                    var img_icon_re = data.data.forecast_1h[i].weather_code;
                    img_icon[i].src = "./images/" + img_icon_re + ".png";
                    
                    var temp_re = data.data.forecast_1h[i].degree;
                    temp_info[i].innerText = temp_re + '°';
                }
        
            }
        })
        
        jsonp ({
            url: 'https://wis.qq.com/weather/common',
            data: {
                source: 'pc',
                weather_type: 'forecast_24h',
                // weather_type: 'forecast_1h|forecast_24h',
                province: mypro,
                city: x,
                county: y
            },
            success: function (data) {
                var info_date = document.getElementsByClassName('info_date');
                var info_title = document.getElementsByClassName('info_title1');
                var status_title = document.getElementsByClassName('status_title');
                var status_title1 = document.getElementsByClassName('status_title1');
                var status_icon = document.getElementsByClassName('status_icon');
                var status_icon1 = document.getElementsByClassName('status_icon1');
                var status_temp = document.getElementsByClassName('status_temp');
                var status_temp1 = document.getElementsByClassName('status_temp1');
                var wind1 = document.getElementsByClassName('wind1');
        
                function changeTime(date) {
                    var month = date.substr(5, 2);
                    var day = date.substr(8, 2);
                    return month + '月' + day + '日';
                }
        
                function getWeekByDay(dayValue){ //dayValue=“2014-01-01”
                    var day = new Date(Date.parse(dayValue.replace(/-/g, '/')));
                    var today = new Array("周日","周一","周二","周三","周四","周五","周六");
                    return today[day.getDay()];
                }
                
                for(var i = 0; i<8; ++i){
                    var re_date1 = data.data.forecast_24h[i].time;
                    var date_change = changeTime(re_date1);
                    info_date[i].innerHTML = date_change;
        
        
        
                    var we_we = data.data.forecast_24h[i].day_weather;
                    status_title[i].innerHTML = we_we;
        
                    var we_we1 = data.data.forecast_24h[i].night_weather;
                    status_title1[i].innerHTML = we_we1;
        
                    var img_icon_top = data.data.forecast_24h[i].day_weather_code;
                    status_icon[i].src = "./images/" + img_icon_top + ".png";
        
        
                    var temp = data.data.forecast_24h[i].max_degree;
                    status_temp[i].innerHTML = temp + "°";
        
                    var temp1 = data.data.forecast_24h[i].min_degree;
                    status_temp1[i].innerHTML = temp1 + "°";
        
                    var img_icon_bott = data.data.forecast_24h[i].night_weather_code;
                    status_icon1[i].src = "./image/" + img_icon_bott + ".png";
        
                    var wind_d = data.data.forecast_24h[i].night_wind_direction;
                    var wind_p = data.data.forecast_24h[i].night_wind_power;
                    wind1[i].innerHTML = wind_d + " " + wind_p + "级";
                }
                for(var i = 4;i < 8; i ++)
                {
                    var re_date2 = data.data.forecast_24h[i].time;
                    var week_change = getWeekByDay(re_date2);
                    info_title[i].innerHTML = week_change;
                }
        
            }
        })
        
        jsonp ({
            url: 'https://wis.qq.com/weather/common',
            data: {
                source: 'pc',
                weather_type: 'index',
                // weather_type: 'forecast_1h|forecast_24h',
                province: mypro,
                city: x,
                // county: y
            },
            success: function (data) {
                var info_text = document.getElementsByClassName('info_text');
                info_text[0].innerHTML = data.data.index.clothes.name + " " + data.data.index.clothes.info;
                info_text[1].innerHTML = data.data.index.umbrella.name + " " + data.data.index.umbrella.info;
                info_text[2].innerHTML = data.data.index.fish.name + " " + data.data.index.fish.info;
                info_text[3].innerHTML = data.data.index.tourism.name + " " + data.data.index.tourism.info;
                info_text[4].innerHTML = data.data.index.cold.name + " " + data.data.index.cold.info;
                info_text[5].innerHTML = "洗车" + " " + data.data.index.carwash.info;
                info_text[6].innerHTML = data.data.index.traffic.name + " " + data.data.index.traffic.info;
                info_text[7].innerHTML = data.data.index.diffusion.name + " " + data.data.index.diffusion.info;
                info_text[8].innerHTML = data.data.index.sports.name + " " + data.data.index.sports.info;
                info_text[9].innerHTML = data.data.index.sunscreen.name + " " + data.data.index.sunscreen.info;
                info_text[10].innerHTML = "舒适度" + " " + data.data.index.comfort.info;
                info_text[11].innerHTML = data.data.index.drying.name + " " + data.data.index.drying.info;
        
                var info_detail = document.getElementsByClassName('info_detail');
                info_detail[1].innerHTML = data.data.index.umbrella.detail;
                info_detail[10].innerHTML = data.data.index.comfort.detail;
                info_detail[11].innerHTML = data.data.index.drying.detail;
                info_detail[4].innerHTML = data.data.index.cold.detail;
                info_detail[5].innerHTML = data.data.index.carwash.detail;
                info_detail[6].innerHTML = data.data.index.traffic.detail;
                info_detail[8].innerHTML = data.data.index.sports.detail;
                info_detail[9].innerHTML = data.data.index.sunscreen.detail;
            }
        })
        
        jsonp ({
            url: 'https://wis.qq.com/weather/common',
            data: {
                source: 'pc',
                weather_type: 'tips',
                // weather_type: 'forecast_1h|forecast_24h',
                province: mypro,
                city: x,
                county: y
            },
            success: function (data) {
                var tip_text = document.getElementById('text_tip');
                var fake_bu = document.getElementById('fake_bu');
                var text = data.data.tips.observe;
                var cnt = 1;
                fake_bu.onclick = function() {
                    if(cnt % 2 == 1){
                        tip_text.innerHTML = text[0];
                        cnt ++
                    }else{
                        tip_text.innerHTML = text[1];
                        cnt ++
                    }
                }
            }
        })
        
        const canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,640,105);
        var min_points = [];
        var max_points = [];
        var points1 = [];
        var points2 = [];
        const drawPoint1 = (ctx, cx, cy, r) => {
            ctx.save()
        
            ctx.lineWidth = 2
            ctx.moveTo(cx, cy)
            ctx.beginPath()
            ctx.arc(cx, cy, r, 0, Math.PI * 2)
            ctx.fillStyle = 'orange'
            ctx.fill()
            ctx.strokeStyle = 'orange'
            ctx.stroke()
            ctx.closePath()
        
            ctx.restore()
        }
        
        const drawPoint2 = (ctx, cx, cy, r) => {
            ctx.save()
        
            ctx.lineWidth = 2
            ctx.moveTo(cx, cy)
            ctx.beginPath()
            ctx.arc(cx, cy, r, 0, Math.PI * 2)
            ctx.fillStyle = '#ACD6FF'
            ctx.fill()
            ctx.strokeStyle = '#ACD6FF'
            ctx.stroke()
            ctx.closePath()
        
            ctx.restore()
        }
        
        const drawLine1 = (ctx, p1, p2) => {
            ctx.save()
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = 'orange';
            ctx.stroke()
            ctx.closePath()
            ctx.restore()
        }
        
        const drawLine2 = (ctx, p1, p2) => {
            ctx.save()
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = '#ACD6FF';
            ctx.stroke()
            ctx.closePath()
            ctx.restore()
        }
        
        jsonp ({
            url: 'https://wis.qq.com/weather/common',
            data: {
                source: 'pc',
                weather_type: 'forecast_24h',
                // weather_type: 'forecast_1h|forecast_24h',
                province: mypro,
                city: x,
                district: y
            },
            success: function (data) {
                var x_index = 10;
                var y_index_max = 40;
                var y_index_min = 80;
                for(var i = 0; i < 8; i++){
                    min_de = data.data.forecast_24h[i].min_degree;
                    max_de = data.data.forecast_24h[i].max_degree;
                    min_points.push(min_de);
                    max_points.push(max_de);
                    drawPoint1(ctx, x_index + (i * 89), y_index_max - ((max_de - 25)*2), 2);
                    drawPoint2(ctx, x_index + (i * 89), y_index_min + ((20 - min_de)*2), 2);
                    points1.push({
                        x: x_index + (i * 89),
                        y: y_index_max - ((max_de - 25)*2),
                    })
                    points2.push({
                        x: x_index + (i * 89),
                        y: y_index_min + ((20 - min_de)*2),
                    })
                    if(points1.length > 1) {
                        drawLine1(ctx,points1[points1.length - 2],points1[points1.length - 1]);
                    }
                    if(points2.length > 1) {
                        drawLine2(ctx,points2[points2.length - 2],points2[points2.length - 1]);
                    }
                }
            }
        })

    }
}