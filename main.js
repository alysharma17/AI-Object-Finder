status=" ";
video=" ";
objects=[];

function preload() {
    video=createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas=createCanvas(600,400);
    canvas.center();
}



function draw() {
    image(video, 0,0, 600,400);
    if (status !=" ") {
        object_detector.detect(video, gotResults);
        for (i=0; i<objects.length; i++) {
            document.getElementById("detecting").innerHTML="Objects detected!";
            document.getElementById("object_number").innerHTML="Number of objects detected is " +objects.length;
            percentage=floor(objects[i].confidence*100);
            r=random(255);
            g=random(255);
            b=random(255);
            fill(r,g,b);
            text(objects[i].label + " "+percentage+"%", objects[i].x+5,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function start() {
    object_detector=ml5.objectDetector('cocossd', model_loaded);
    document.getElementById("detecting").innerHTML="Detecting objects...";
}


function model_loaded() {
    status=true;
    console.log("Model Loaded!");
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResults(error,results) {
    if(error) {
        console.log(error);
    }
    else {
    console.log(results);
    objects=results;
    }
}