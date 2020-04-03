
// Setting default values 
document.getElementById("P").defaultValue = "3";
document.getElementById("C").defaultValue = "50";
document.getElementById("O").defaultValue = "5";
document.getElementById("D").defaultValue = "40";
document.getElementById("R").defaultValue = "10";
document.getElementById("M").defaultValue = "8000";

// Creating variables
var canvas = document.getElementById("canvas");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var ctx = canvas.getContext("2d");
var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
var D = parseInt(document.getElementById("D").value | 0);
var O = parseInt(document.getElementById("O").value | 0);
var P = parseInt(document.getElementById("P").value | 0);
var C = parseInt(document.getElementById("C").value | 0);
var R = parseInt(document.getElementById("R").value | 0);
var M = parseInt(document.getElementById("M").value | 0);
var box = document.querySelector('div.countPanelContainer');
var note = document.getElementById('note');
var clicks = 0;
var infected = O;
var total = O;
var countMax = 0;
var reco = 0;
var totalArr = [];
var ctxArr = [[0, canvasHeight]];
var infectedArr = [[0, canvasHeight]];

// Controls 
function medic() {
    R += 20;
    document.getElementById("R").value = R;
    document.getElementById("action").innerHTML = "Day " + clicks + ": strengthened medical action";
}

function stayHome() {
    C = 5;
    document.getElementById("C").value = 5;
    document.getElementById("action").innerHTML = "Day " + clicks + ": started shelter in place";
}

function mutation() {
    P += 50;
    document.getElementById("P").value = P;
    document.getElementById("action").innerHTML = "Day " + clicks + ": virus mutation";
}

// Other utilities
function showBox() {
    box.style.display = 'block';
}
function closeNote() {
    note.style.display = 'none';
}
function closeStats() {
    box.style.display = 'none';
}
function closeGraph() {
    document.getElementById("graphy").style.display = "none";
}
function randomy(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}
function showTips() {
    var randomNum = randomy(1, 4);
    if (randomNum == 3) {
        document.getElementById("tip1").style.display = "block";
    }
    else if (randomNum == 2) {
        document.getElementById("tip2").style.display = "block";
    }
    else if (randomNum == 1) {
        document.getElementById("tip3").style.display = "block";
    }
}
function closeTip1() {
    document.getElementById("tip1").style.display = "none";
}
function closeTip2() {
    document.getElementById("tip2").style.display = "none";
}
function closeTip3() {
    document.getElementById("tip3").style.display = "none";
}
// Updating variables 
function updateC() {
    C = document.getElementById("C").value;
}

function updateD() {
    D = document.getElementById("D").value;
}

function updateO() {
    O = document.getElementById("O").value;
}

function updateP() {
    P = document.getElementById("P").value;
}

function updateR() {
    R = document.getElementById("R").value;
}

function updateM() {
    M = document.getElementById("M").value;
}

// Canvas utility
function drawPixel(x, y, r, g, b, a) {
    var index = (x + y * canvasWidth) * 4;
    canvasData.data[index + 0] = r;
    canvasData.data[index + 1] = g;
    canvasData.data[index + 2] = b;
    canvasData.data[index + 3] = a;
}

// function drawLine(x1, y1, x2, y2, col){
// 	ctx.beginPath();
// 	ctx.moveTo(x1, y1);
// 	ctx.lineTo(x2, y2);
// 	ctx.stroke();
// 	ctx.strokeStyle = col;
// 	ctx.lineWidth = 5;
// }

// ctx.font = "12px Source Sans Pro";
// ctx.fillText("Line Graph", 2, 12);	
// ctx.fillStyle = "#183661";
// ctx.fillText("Blue: Total Infected count", 2, 20);
// ctx.fillText("Orange: Infected Today", 2, 28);

function updateCanvas() {
    ctx.putImageData(canvasData, 0, 0);
}

// Draw graph 
function draw() {
    var widIndex = canvasWidth / D;
    var htIndex = canvasHeight / M;
    clicks += 1;
    if (clicks >= D) {
        alert("Maximum days reached");
    }

    infected = parseInt(infected * C * (P / 100));
    reco = parseInt(total * (R / 100));
    if (reco == 0) {
        reco = 1;
    }
    total = total + infected - reco;
    totalArr.push(total);

    if (total >= M) {
        if (countMax == 0) {
            infected = M - totalArr[clicks - 2];
            total = M;
            countMax += 1;
        }
        else {
            infected = 0;
            total = total - reco;
        }
    }

    if (total <= 0) {
        infect = 0;
        total = 0;
        reco = 0;
    }

    var wid = widIndex * clicks;
    var ht = canvasHeight - (total * htIndex);
    ctxArr.push([wid, ht]);

    var infectedht = canvasHeight - (infected * htIndex);
    infectedArr.push([wid, infectedht]);

    document.getElementById("today").innerHTML = infected;
    document.getElementById("total").innerHTML = total;
    document.getElementById("day").innerHTML = clicks;
    document.getElementById("recovered").innerHTML = reco;

    drawPixel(wid, ht, 221, 107, 77, 255);
    // updateCanvas();
    // drawLine(ctxArr[clicks - 1][0],ctxArr[clicks - 1][1],wid,ht,"#dd6b4d");
    ctx.beginPath();
    ctx.moveTo(ctxArr[clicks - 1][0], ctxArr[clicks - 1][1]);
    ctx.lineTo(wid, ht);
    ctx.stroke();
    ctx.strokeStyle = "#183661";

    ctx.beginPath();
    ctx.moveTo(infectedArr[clicks - 1][0], infectedArr[clicks - 1][1]);
    ctx.lineTo(wid, infectedht);
    ctx.stroke();
    ctx.strokeStyle = "#dd6b4d";

    ctx.lineWidth = 1;
    ctx.font = "5px Source Sans Pro";
    ctx.fillText(clicks, wid, canvasHeight);
}

function skip() {
    var i;
    for (i = 0; i < 5; i++) {
        draw();
    }
}
