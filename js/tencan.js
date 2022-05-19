const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d',false);
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
        province: '陕西省',
        city: '西安市',
        district: '长安区'
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
