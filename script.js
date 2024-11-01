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
    positionX: 100,
    positionY: 770

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

        this.draw = function () {
            game.ctx.save();
            game.ctx.fillStyle = game.shootingColor;
            game.ctx.fillRect(this.x, this.y, this.width, this.width);
            this.y -= 4;
            game.ctx.restore();
        };
    };
};

class Player {
    constructor(x) {
        this.x = x;
        this.y = 600;
        this.draw = function (x) {
            this.x = x;
            this.y = game.positionY;
            game.ctx.drawImage(game.image, this.x, this.y, 120, 80);
        };
    };
};

class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this. width = 60;
        this.height = 55;
        this.amountOfEnemies = 0;
        this.distanceX = 5; // Speed
        this.cycles = 0;
        this.number = 14;
        this.figure = true;
        this.live = true;
        
        this.draw = function () {

            if(this.cycles > 30){

                // Change position of the enemy
                if(this.amountOfEnemies > this.number){
                    this.distanceX *= -1;
                    this.amountOfEnemies = 0;
                    this.number = 28;
                    this.y += 20;
                    this.distanceX = (this.distanceX > 0) ? this.distanceX ++ : this.distanceX --; // Ternary operator
                } else {
                    this.x += this.distanceX;
                }

                this.amountOfEnemies ++;
                this.cycles = 0;
                this.figure = !this.figure;
                
            } else {
                this.cycles ++;
            }


            if(this.figure){
                game.ctx.drawImage(game.enemyImage, 0, 0, 40, 30,this.x, this.y, 70, 65); 

            } else {
                game.ctx.drawImage(game.enemyImage, 50, 0, 35, 30, this.x, this.y, 70, 65); 

            }



        };
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
    game.player = new Player(game.canvas.width / 2);
    game.positionX = game.canvas.width / 2;
    game.player.draw(game.positionX); 
    animate();
}









let positionX = 100, positionY = 100;


const animate = () => {
    requestAnimationFrame(animate);
    verifyPosition();
    draw();
};

const verifyPosition = () => {
    if(game.key[keyRight]) game.positionX += 10;
    if(game.key[keyLeft]) game.positionX -= 10;

    if(game.positionX > game.canvas.width - 130) game.positionX = game.canvas.width - 130;
    if(game.positionX < 0) game.positionX = -0;

    // Shooting
    if(game.key[spacebar]){
        game.shootingArray.push(new Shooting(game.positionX + 90, game.positionY - 10, 5));
        game.key[spacebar] = false;
    }

};


const draw = () => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.player.draw(game.positionX);

    // Move shooting
    for(let i = 0; i < game.shootingArray.length; i++){
        if(game.shootingArray[i] != null){
            game.shootingArray[i].draw();

            if(game.shootingArray[i].y < 0) game.shootingArray[i] = null;
        }
    }

    // Enemy
    for(let i = 0; i < game.enemyArray.length; i ++){
        game.enemyArray[i].draw();
    }


};




document.addEventListener('keydown', function(e){
    game.keyPressed = e.keyCode;
    game.key[e.keyCode] = true;
});

document.addEventListener('keyup', function(e){
    game.key[e.keyCode] = false;
});



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
            game.image = new Image();
            game.image.src = 'img/nave.png';
            game.enemyImage = new Image();
            game.enemyImage.src = 'img/enemy.png';

            game.enemyImage.onload = function(){
                for(let i = 0; i < 5; i++){
                    for(let j = 0; j < 10; j ++){
                        game.enemyArray.push(new Enemy(65+80*j, 30+70*i));
                    };
                };
            };


            cover();
            game.canvas.addEventListener('click', select, false);


            


        } else{
            alert('Your browser does not support canvas')
        };
    
    
    
    };
};