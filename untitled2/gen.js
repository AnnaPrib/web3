let canvas = document.createElement("canvas");
canvas.setAttribute("width", "800");
canvas.setAttribute("height", "600");

let body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);

let ctx = canvas.getContext("2d");
ctx.fillRect(0, 0, canvas.width, canvas.height);

let saveText = document.createElement("p");
saveText.innerText = "Save";

let saveButton = document.createElement("button");
saveButton.appendChild(saveText);

let saveButtonLinkWrapper = document.createElement("a");
saveButtonLinkWrapper.setAttribute("id", "download");
saveButtonLinkWrapper.setAttribute("download", "mycollage.jpg");
saveButtonLinkWrapper.setAttribute("href", "");

saveButtonLinkWrapper.appendChild(saveButton);
body.appendChild(saveButtonLinkWrapper);

var numberOfImages = 0;

function loadImages() {
    let urlImage1 = "https://source.unsplash.com/collection/769850/400x300?t" + Math.random();
    let urlImage2 = "https://source.unsplash.com/collection/769850/400x300?t" + Math.random();
    let urlImage3 = "https://source.unsplash.com/collection/769850/400x300?t" + Math.random();
    let urlImage4 = "https://source.unsplash.com/collection/769850/400x300?t" + Math.random();

    let image1 = new Image();
    let image2 = new Image();
    let image3 = new Image();
    let image4 = new Image();

    image1.src = urlImage1;
    image2.src = urlImage2;
    image3.src = urlImage3;
    image4.src = urlImage4;

    ctx.globalAlpha = 0.5;

    image1.onload = function () {
        ctx.drawImage(image1, 0, 0);
        numberOfImages++;
        if (numberOfImages === 4)
            getQuote();
    };

    image2.onload = function () {
        ctx.drawImage(image2, 400, 0);
        numberOfImages++;
        if (numberOfImages === 4)
            getQuote();
    };

    image3.onload = function () {
        ctx.drawImage(image3, 0, 300);
        numberOfImages++;
        if (numberOfImages === 4)
            getQuote();
    };

    image4.onload = function () {
        ctx.drawImage(image4, 400, 300);
        numberOfImages++;
        if (numberOfImages === 4)
            getQuote();
    };
};

    function insertText(quote){
        ctx.font = '28px bold';
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const words = quote.split(' ');
        let fulltext = [];
        let countWords = words.length;
        let line = '';
        let countlines = 0;

        for (let n = 0; n < countWords; ++n) {
            let testLine = line + words[n] + ' ';
            let testWidth = ctx.measureText(testLine).width;
            if (testWidth > (canvas.width * 0.8)) {
                line = words[n] + ' ';
                countlines++;
            }
            else {
                line = testLine;
            }
            fulltext[countlines] = line;
        }
        let marginTop = (canvas.height - 28 * countlines) / 2 ;
        for (let n = 0; n < fulltext.length; n++){
            ctx.fillText(fulltext[n], canvas.width/2, (marginTop + n * 28));
        }
    }


function getQuote() {
    $.ajax({
        url: 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?',
        dataType: 'jsonp',
        timeout: 1000
    })
        .done(function (result) {
            insertText(result.quoteText);
        })
        .fail(function () {
            alert('error');
        });
}

function generatePost(){
    numberOfImages = 0;
    loadImages();
}

generatePost();