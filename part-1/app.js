// Set constraints for the video stream
var constraints = {video: {facingMode:{exact: 'user'}}, audio: false};
var constraints2 = {video: {facingMode:{exact: 'environment'}}, audio: false};
var track = null;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    cameraSwitch = document.querySelector("#camera--switch"),
    saveImage = document.querySelector("#save--image"),
    overlay = document.querySelector("#overlay");

// Access the device camera and stream to cameraView (Front Cam)
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

// Access the device camera and stream to cameraView (Back Cam)
function cameraStart2() {
    navigator.mediaDevices
        .getUserMedia(constraints2)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

var callOne = true;
function call() {
    if(callOne){
        cameraStart2();
    } else{
        cameraStart();
    }
    callOne = !callOne;
}

cameraSwitch.onclick = function() {
    call();
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;

    var image2 = new Image();
    image2 = document.getElementById('overlay');
    image2.crossOrigin = "Anonymous";

    var canvas = document.getElementById('camera--sensor'); 
    var context = canvas.getContext('2d');  
    context.drawImage(cameraView, 0, -20, cameraSensor.width, cameraSensor.height);
    image2.src = "frame.png";
    context.drawImage(image2, 0, -20, cameraSensor.width, cameraSensor.height);

    // context.globalAlpha = 1.0;
    // context.drawImage(cameraView, 0, 0, 328, 526);
    // context.globalAlpha = 0.5; //Remove if pngs have alpha
    // context.drawImage(image2, 15, 85, 300, 300);

    // cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    // track.stop();
};

// Save the image to local gallery
saveImage.onclick = function() {
    var gh = cameraOutput.src;
    var a  = document.createElement('a');
    a.href = gh;
    a.download = 'image.png';

    a.click()
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);