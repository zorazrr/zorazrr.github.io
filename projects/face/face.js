var trigger = document.querySelector('button.trigger');
var video = document.querySelector('video[playsinline]');
var buttonPicture = document.querySelector('button#picture');
var buttonFace = document.querySelector('button#face');
var buttonDownload = document.querySelector('a#download');
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
var guide = document.querySelector('div#pageGuide');
var guideButton = document.querySelector('button#guideButton');
var landMark = document.querySelector('a#aElement');
var inputy = document.querySelector('input#label');
var title = document.querySelector('div.foo');
var introo = document.querySelector('div#intro');
var age = document.querySelector('div#age');
var gender = document.querySelector('div#gender');
var expression = document.querySelector('div#expression');
var agie = document.querySelector('h3#agie');
var gendie = document.querySelector('h3#gendie');
var expressie = document.querySelector('h3#expressie');
var firstWord = document.querySelector('span#firstWord');
var loading = document.querySelector('img');
var genderData = {
	'male':"https://thumbs.gfycat.com/SolidBoilingBeaver-max-1mb.gif"
	,'female':"https://zora.wisen.space/rljafcbrgns-_jicjci6kssh.gif"
}
var main = document.querySelector('main');

var constraints = {
	audio: false
	, video: {
		width: 640, height: 480, facingMode: 'environment'
	}
}

function showLandMark(){
	landMark.style.display = 'block';
}

function showGuide(){
	guide.style.display = 'block';
}
function exitGuide(){
	guide.style.display = 'none';
}

//This turns the Web camera on 
function setupVideo() {
	navigator
	.mediaDevices
	.getUserMedia(constraints)
	.then(loadVideo)
	.catch(handleError);
}
function loadVideo(mediaStream) {
	video.srcObject = mediaStream;
	video.onloadedmetadata = playVideo;
}
function playVideo() {
	video.play();
	video.style.display = 'block';
	trigger.style.display = 'none';
	buttonPicture.style.display = 'block';
	buttonFace.style.display = 'block';
	introo.style.display = 'none';
	title.style.display = 'none';
}
function detectFace(){
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	video.style.display = 'none';
	canvas.style.display = 'block';
	analyze();
}
async function analyze(){
	var displaySize = {
		width: video.videoWidth,
		height: video.videoHeight
	}
		landMark.style.display = 'block';
		inputy.style.display = 'block';
	faceapi.matchDimensions(video, displaySize);
	var results = await faceapi
		.detectSingleFace(video)
		.withFaceLandmarks()
		.withFaceExpressions()
		.withAgeAndGender()
		.withFaceDescriptor();

	if (results){
		context.drawImage(video, 0, 0, canvas.width, canvas.height);
		var resizedDetections = faceapi.resizeResults(results, displaySize);
		faceapi.draw.drawFaceLandmarks(canvas,resizedDetections);
		agie.style.display = 'block';
		gendie.style.display = 'block';
		expressie.style.display = 'block';
		buttonFace.style.display = 'none';
		buttonPicture.style.display = 'none';
		
		age.innerHTML = results.age;
		gender.innerHTML = results.gender;

		var exp = 'Bazinga';
		var score = 0.5;
		Object.keys(results.expressions).forEach(function(item){
			var s = results.expressions[item];
			if (s>score){
				exp = item;
				score = s;
			}
		});
		
		expression.innerHTML = exp;
		
		var emotion = inputy.value;
		var data = JSON.stringify(results.landmarks, null, 2);
		landMark.setAttribute('download', emotion + '.json');
		landMark.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(data));

		
	}
	setTimeout(analyze, 500);
}

function handleError(err) {
	alert(err.message);
}
function takePicture(){
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	video.style.display = 'none';
	canvas.style.display = 'block';
	context.drawImage(video, 0, 0, canvas.width, canvas.height);
	//showGreyImage();
	//saveTheImage();
	buttonDownload.setAttribute('download','bazinga.png');
	buttonDownload.style.display = 'block';
	buttonDownload.setAttribute('href', canvas.toDataURL());
}

function saveTheImage(){
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/capture/save/dataurl');
	xhr.setRequestHeader('content-type','application/json');
	xhr.send(JSON.stringify({image:canvas.toDataURL()}))
}

function showGreyImage(){
	var imageData = context.getImageData(0,0,canvas.width,canvas.height);
	// R G B Alpha 
	for (var i = 0; i < imageData.data.length; i+=4){
		var r = imageData.data[i];
		var g = imageData.data[i+1];
		var b = imageData.data[i+2];
		var ave = (r + g + b) / 3;
		imageData.data[i] = 255 - ave;
		imageData.data[i+1] = 255 - ave;
		imageData.data[i+2] = 255 - ave;
	}
	context.putImageData(imageData, 0 , 0);
}

async function loadModels() {
	await faceapi.nets.ssdMobilenetv1.loadFromUri('/libs/models');
	await faceapi.nets.tinyFaceDetector.loadFromUri('/libs/models');
	await faceapi.nets.mtcnn.loadFromUri('/libs/models');
	await faceapi.nets.faceLandmark68Net.loadFromUri('/libs/models');
	await faceapi.nets.faceLandmark68TinyNet.loadFromUri('/libs/models');
	
	await faceapi.nets.faceRecognitionNet.loadFromUri('/libs/models');
	await faceapi.nets.faceExpressionNet.loadFromUri('/libs/models');
	await faceapi.nets.ageGenderNet.loadFromUri('/libs/models');
	loading.style.display = 'none';
	trigger.style.display = 'block';

}
loadModels();

trigger.addEventListener('click',setupVideo);
buttonPicture.addEventListener('click',takePicture);
buttonFace.addEventListener('click',detectFace);
guideButton.addEventListener('click',showGuide);
guide.addEventListener('click',exitGuide);
