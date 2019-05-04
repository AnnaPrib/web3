function counterLine(ctx, text, marginLeft, maxWidth, lineHeight, screenHeight)
{
    var words = text.split(" ");
    var countWords = words.length;
    var line = "";
    var countLine = 0;
    for (var n = 0; n < countWords; n++) {
        var testLine = line + words[n] + " ";
        var testWidth = ctx.measureText(testLine).width;
        if (testWidth > maxWidth) {
            countLine++;
            line = words[n] + " ";
        } else {
            line = testLine;
        }
    }
    ++countLine;
    return (screenHeight / 2 - (countLine / 2 - 0.5) * lineHeight);
}

function calcMargin(strWidth, screenWidth)
{
    return (screenWidth - strWidth) / 2;
}

function wrapText(ctx, text, marginLeft, marginTop, maxWidth, lineHeight)
{
    var words = text.split(" ");
    var countWords = words.length;
    var line = "";
    for (var n = 0; n < countWords; n++) {
        var testLine = line + words[n] + " ";
        var testWidth = ctx.measureText(testLine).width;
        if (testWidth > maxWidth) {
            var marginLeftStr = calcMargin(ctx.measureText(line).width, marginLeft+maxWidth);
            ctx.fillText(line, marginLeftStr, marginTop);
            line = words[n] + " ";
            marginTop += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    var marginLeftStr = calcMargin(ctx.measureText(line).width, marginLeft+maxWidth);
    ctx.fillText(line, marginLeftStr, marginTop);
}


window.onload=function(){
    var img=new Image();
    img.onload=function(){run()};
    img.src='test.jpg';
    function run(){
        var ctx=document.getElementById('cnv').getContext('2d');
        cnv.width = 600;
        cnv.height = 300;

        ctx.drawImage(img, 0, 0, cnv.width, cnv.height);

        var marginLeft = 20;
        var maxWidth = cnv.width-marginLeft;
        var lineHeight = 25;
        ctx.font = "20px Calibri";
        ctx.fillStyle = "white";

        getImage
        function httpGet(theUrl)
        {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", theUrl, true); // false for synchronous request
            xmlHttp.send( null );
            return xmlHttp.responseText;
        }
        alert(httpGet("http://unsplash.com/photos/random"));


        var xhr = new XMLHttpRequest();
        // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
        xhr.open('GET', 'http://127.0.0.1:5000/quote', false);
        xhr.send();
        var jsonResponse = xhr.responseText;
        jsonResponse = JSON.parse(jsonResponse);

        var text = jsonResponse["quoteText"];
        var marginTop = counterLine(ctx, text, marginLeft, maxWidth, lineHeight, cnv.height);
        wrapText(ctx, text, marginLeft, marginTop, maxWidth, lineHeight);}
    ;
}