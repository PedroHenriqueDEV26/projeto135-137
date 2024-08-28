var img = ""
var status = ""
var objects = []

function preload(){
    img = loadImage("setup.jpg")
}



function setup(){
 canvas = createCanvas(600, 500)
 canvas.center()
 video1 = createCapture(VIDEO)
 video1.hide()
 objDetector = ml5.objectDetector("cocossd", modelLoaded)
}

function start(){
    objDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "detectando objetos..."

}

function modelLoaded(){
    console.log("modelo carregado!")
    status = true;
    objDetector.detect(video1, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error)
    }
    console.log(results)

    objects = results;



}

function draw(){
    image(video1, 0,0, width, height) 
    


    // fill("blue")
    // text("Gato", 330, 95)
    // noFill()
    // stroke("blue")
    // rect(230, 100, 250, 350)

    if (status != "") {
        objDetector.detect(video1, gotResult);
        for (var j = 0; j < objects.length; j++) {
            document.getElementById("status").innerHTML = "Objetos detectados"
            document.getElementById("qtdObj").innerHTML = "Quantidade de objetos detectadas: "+ objects.length
            fill("red")
            percent = floor(objects[j].confidence*100)
            text(objects[j].label+" "+percent+"%", objects[j].x, objects[j].y)

            noFill()
            stroke("red")
            rect(objects[j].x, objects[j].y, objects[j].width, objects[j].height) 
            
        }
    }
}