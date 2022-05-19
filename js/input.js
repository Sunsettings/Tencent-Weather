function iw() {
    document.getElementsByClassName('search_wr')[0].style.display = 'block';
    var ule = document.getElementById('myul');
    ule.innerHTML = "";

    var myinput = document.getElementById('search_box').value;
    x = (encodeURI(myinput));
    jsonp ({
    url: 'https://wis.qq.com/city/like',
    data: {
        source: 'pc',
        // weather_type: 'forecast_1h|forecast_24h',
        city: x,
    },
    success: function (data) {
        
        var mydata = data.data
        var ulcon = document.getElementsByTagName('ul')[0];
        if(JSON.stringify(mydata) === '{}' && x != ""){
            var thing1 = document.createElement('li');
            thing1.innerHTML = "抱歉";
            ulcon.appendChild(thing1);
        }else{
            // box.style.display = 'none';
            for(var prop in mydata){
                var thing = document.createElement('li');
                thing.innerHTML = mydata[prop];
                ulcon.appendChild(thing);
            }
        }
        }
    })
}