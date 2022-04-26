const canvas = document.querySelector('canvas');
const height = 512;
const width = 288;

canvas.style.border = '1px solid black';
canvas.width = '' + width;
canvas.height = '' + height;


function addImage(uri){
    const img = document.createElement('img');
    img.src = uri;
    document.body.appendChild(img);
    return img;
}

const bg = addImage('images/background-night.png');
const pipe = addImage('images/pipe-green.png');


const downflap = addImage('images/yellowbird-downflap.png');
const upflap = addImage('images/yellowbird-upflap.png');
const midflap = addImage('images/yellowbird-midflap.png');


const ctx = canvas.getContext('2d');

let score = 0;
let paused = false;
window.requestAnimationFrame(draw);

const bird = {
    x: 20,
    y: 60,
    fallingSpeed : 0,
    image: midflap,
    width: 34,
    height: 24,
}

const obs = {
    x: 300,
    y: Math.floor(Math.random() * 200) + 200,
    gap:  150,
    width: 52,

}



function draw(){

    if (!paused) {
        ctx.clearRect(0, 0, width, height);



        applyGravity();
        applyMovement();
    
        xColliding();
    
    
    
    
        ctx.drawImage(bg, 0, 0);
        ctx.drawImage(pipe, obs.x, obs.y);
        ctx.drawImage(bird.image, bird.x, bird.y);
    
    
        ctx.save();
        ctx.scale(1, -1);
        ctx.drawImage(pipe, obs.x, -obs.y + obs.gap);
        ctx.restore();
    
    }
    



    window.requestAnimationFrame(draw);
}


function applyGravity() {
    let currentY = bird.y;
    bird.y += bird.fallingSpeed;
   
    bird.fallingSpeed += 0.2;
    if (bird.fallingSpeed >= 9) {
        bird.fallingSpeed = 9;
    }

    if (bird.y >= height -50 ) {
        bird.y = height - 50;
    }

    if (currentY < bird.y) {
        bird.image = upflap;
    }
    else if (currentY > bird.y) {
        bird.image = downflap;
    }
    if (Math.abs(bird.fallingSpeed) < 1) {
        bird.image = midflap;
    }
}

function applyMovement() {
    if (obs.x >= -50) {
        obs.x -= 2;
    } else {
        obs.x = 300;
        randomPipeMovement();
        score++;
        console.log(score);
    }


}

function randomPipeMovement() {
    let location = Math.floor(Math.random() * 200) + 200
    obs.y = location;
    console.log(location)
}

document.addEventListener('click', () => {
    bird.fallingSpeed = -5;
});

function xColliding() {
    if (bird.x + bird.width  > obs.x && bird.x < obs.x + pipe.width ){

        if (bird.y < obs.y - obs.gap || bird.y + bird.height > obs.y ) {
            console.log('hit');
            paused = true;
           
        }
    }
}