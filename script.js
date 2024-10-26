game = {
    canvas: null,
    ctx: null,
    image: null,
    cover: true,
    enemyImage: null,
    keyPressed: null,
    key: [],
    shootingColor: 'red',
    shootingArray: new Array(),
    enemyArray: new Array(),

};

const keyEnter = 13;
const keyLeft = 37;
const keyUp = 38;
const keyRight = 39;
const keyDown = 40;
const spacebar = 32;


class Shooting {
    constructor(x, y, width) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.draw = function () { };
    };
};

class Player {
    constructor(x) {
        this.x = x;
        this.y = 450;
        this.draw = function (x) {
            this.x = x;
            game.ctx.drawImage(game, image, this.x, this.y, 30, 15);
        };
    };
};

class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this. width = 35;
        this.amountOfEnemies = 0;
        this.distanceX = 5; // Speed
        this.cycles = 0;
        this.number = 14;
        this.figure = true;
        this.live = true;
        this.draw = function () {};
    };
};

const cover = () => {
    let image = new Image();
    image.src = 'img/cover.png';
    image.onload = () => {
        // Calculate scale
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Image proportions
        const imgWidth = image.width;
        const imgHeight = image.height;

        // Calculate new scale
        const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);
        const newWidth = imgWidth * scale;
        const newHeight = imgHeight * scale;

        // Calculate center position
        const x = (canvasWidth - newWidth) / 2;
        const y = (canvasHeight - newHeight) / 2;

        game.ctx.drawImage(image, x, y, newWidth, newHeight);
    };
};

const select = (e) => {
    if(game.cover) {
        start();
    };
}; 

const start = () => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.cover = false;
}



let positionX = 100, positionY = 100;


const animate = () => {
    requestAnimationFrame(animate);
    verifyPosition();
    draw();

};

const verifyPosition = () => {
    positionX += 2;
    if(positionX > game.canvas.width) positionX = 0;

};

const draw = () => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.ctx.fillStyle = 'red';
    game.ctx.beginPath();
    game.ctx.arc(positionX, positionY, 5, 0, 2 * Math.PI);
    game.ctx.fill();

};



window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) { window.setTimeout(callback, 17); }
})();



window.onload = function(){
    game.canvas = document.getElementById('canvas');
    if(game.canvas && game.canvas.getContext){
        game.ctx = canvas.getContext('2d');
    
        if(game.ctx){
            cover();
            // animate();


        } else{
            alert('Your browser does not support canvas')
        };
    
    
    
    };
};