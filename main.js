object=[];
status="";
video="";

function preload() {
    video = createVideo("WhatsApp Video 2021-08-17 at 11.28.59.mp4");
    video.hide();
    song=loadSound("iphone_alaram.mp3");
}
function setup() {
    canvas = createCanvas(500, 400);
    canvas.position(500, 250);
   // video.loop();
    //video.volume(0);
    //video.speed(1);
}

function draw() {
    image(video, 0, 0, 500, 400);
        if(status!="")
    {
        objectDetector.detect(video , gotresults);
        document.getElementById("status").innerHTML="Status : Objects Detected";
        document.getElementById("number_of_objects").innerHTML="Number Of Objects :"+object.length;

        for(i=0; i<object.length; i++)
        {
            fill("red");
            stroke("red");
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%" ,object[i].x , object[i].y);

            noFill();
            rect(object[i].x , object[i].y , object[i].width , object[i].height);
        }
    }
    if(cellphone=object.length)
    {
        song.play();
        song.setVolume(1);
        song.rate(1);
    }

}L
function gotresults(error,results){
if(error)
{
    console.log(error);
}
else
{
    console.log(results);
    object=results;

}
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Dectecting Objects";
    console.log("start")    
}

function modelloaded() {
    console.log("model is loaded");
    video.loop();
    video.volume(0);
    video.speed(1);
    status=true;
    console.log(status);
}