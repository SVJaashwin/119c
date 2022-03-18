function setup() {
    Canvas = createCanvas(358, 361);
    Canvas.center();
    Canvas.background("white");
    Canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function clear_canvas() {
    Canvas.background("white");
}

function preload() {
    classifier = ml5.imageClassifier("DoodleNet");

}

function draw() {
    strokeWeight(25);
    stroke("red");
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas() {
    classifier.classify(Canvas, gotResult);

}

function gotResult(error, result) {
    if (error) {
        console.log(error);
    } else {
        console.log(result);
        document.getElementById("todal").innerHTML = "label:" + result[0].label;
        document.getElementById("confidence").innerHTML = "confidence:" + Math.round(result[0].confidence * 100) + "%";
        utterThis = new SpeechSynthesisUtterance(result[0].label);
        synth.speak(utterThis);
    }

}