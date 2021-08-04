var hyball,database;
var position;

function setup(){
    database = firebase.database();
    console.log(database)
    createCanvas(500,500);

    hyball = createSprite(250,250,10,10);
    hyball.shapeColor = "red";

    var hyballposition = database.ref("ball/position");
    hyballposition.on("value",readPosition,showError)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();

}

function writePosition(x,y){
    database.ref("ball/position").set({
        "x" : position.x + x,
        "y" : position.y + y
    })
    
}


function readPosition(data){
    position = data.val();
    hyball.x = position.x;
    hyball.y = position.y;
}


function showError(){
    console.log("There is an error in writing to database")
}




