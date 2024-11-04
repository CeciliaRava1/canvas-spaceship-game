game = {
    canvas: null,
    ctx: null,
    image: null,
    cover: true,
    enemyImage: null,
    keyPressed: null,
    key: [],
    shootingColor: 'red',
    shootingEnemyColor: 'yellow',
    shootingArray: new Array(),
    enemyArray: new Array(),
    enemyShootingArray: new Array(),
    positionX: 100,
    positionY: 770,
    shooting: false,
    score: 0,
    endGame: false,
    boing: null,
    playerShoot: null,
    intro: null,
    end: null,

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

        this.shoot = function () {
            game.ctx.save();
            game.ctx.fillStyle = game.shootingEnemyColor;
            game.ctx.fillRect(this.x, this.y, this.width, this.width);
            this.y += 6;
            game.ctx.restore();
        };
    };
};

class Player {
    constructor(x) {
        this.x = x;
        this.y = 600;
        this.width = 120;
        this.height = 80;
        this.draw = function (x) {
            this.x = x;
            this.y = game.positionY;
            game.ctx.drawImage(game.image, this.x, this.y, this.width, this.height);
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
    if(game.endGame == false){
        requestAnimationFrame(animate);
        verifyPosition();
        draw();
        collision();
    }
};

const collision = () => {
    let enemy, shooting;
    for(let i = 0; i < game.enemyArray.length; i++){
        
        for(let j = 0; j < game.shootingArray.length; j++){
            enemy = game.enemyArray[i];
            shooting = game.shootingArray[j];

            if(enemy != null && shooting != null){
                
                if((shooting.x > enemy.x) && 
                (shooting.x < enemy.x + enemy.width) && 
                (shooting.y > enemy.y) && 
                (shooting.y < enemy.y + enemy.width)){

                    enemy.live = false;
                    game.enemyArray[i] = null;
                    game.shootingArray[j] = null;
                    game.shooting = false;
                    game.score += 10;
                    game.boing.play();
                }
            }
        }
    }

    // Enemy shoot
    for(let j = 0; j < game.enemyArray.length; j++){
        shooting = game.enemyShootingArray[j];
        if(shooting != null){

            if((shooting.x > game.player.x) && 
            (shooting.x < game.player.x + game.player.width) && 
            (shooting.y > game.player.y) && 
            (shooting.y < game.player.y + game.player.height)){

                gameOver();
            };
        };
    };
};


const gameOver = () => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.shootingArray = [];
    game.enemyArray = [];
    game.enemyShootingArray = [];
    game.endGame = true;
    game.end.play();

    messageEndGame('Game over', 240, '60px');
    messageEndGame('Points: ' + game.score, 380, '50px');

    if (game.score > 200) {
        messageEndGame('You win!', 500, '50px');
    } else if (game.score > 100) {
        messageEndGame('You almost did it', 500, '50px');
    } else {
        messageEndGame('You lost :(', 500, '50px');
    }
};


const messageEndGame = (string, y, size) => {
    let width = game.canvas.width / 2;
    game.ctx.save();
    game.ctx.fillStyle = 'green';
    game.ctx.strokeStyle = 'blue';
    game.ctx.textBaseline = 'top';
    game.ctx.font = 'bold ' + size + ' Courier';
    game.ctx.textAlign = 'center';
    game.ctx.fillText(string, width, y);
    game.ctx.restore();
};



let lastShotTime = 0; 
const shotInterval = 700; // ms

const verifyPosition = () => {
    if (game.key[keyRight]) game.positionX += 10;
    if (game.key[keyLeft]) game.positionX -= 10;

    if (game.positionX > game.canvas.width - 130) game.positionX = game.canvas.width - 130;
    if (game.positionX < 0) game.positionX = 0;

    // Shooting
    const currentTime = Date.now(); 
    if (game.key[spacebar] && (currentTime - lastShotTime) > shotInterval) {
        game.shootingArray.push(new Shooting(game.positionX + 55, game.positionY - 10, 10));
        lastShotTime = currentTime;
        game.playerShoot.play();
    }

    // Shooting enemy
    if (Math.random() > 0.96) {
        enemyShoot();
    }
};



const enemyShoot = () => {
    let lastRowEnemies = game.enemyArray.filter(enemy => enemy !== null && enemy.y === Math.max(...game.enemyArray.map(e => e ? e.y : 0)));

    if (lastRowEnemies.length > 0) {
        const randomIndex = Math.floor(Math.random() * lastRowEnemies.length);
        const randomEnemy = lastRowEnemies[randomIndex];

        game.enemyShootingArray.push(new Shooting(randomEnemy.x + randomEnemy.width / 2, randomEnemy.y + randomEnemy.height, 5));
    }
}





const draw = () => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    score();
    game.player.draw(game.positionX);

    // Move shooting
    for(let i = 0; i < game.shootingArray.length; i++){

        if(game.shootingArray[i] != null){
            game.shootingArray[i].draw();

            if(game.shootingArray[i].y < 0){
                game.shooting = false;
                game.shootingArray[i] = null;
            }
        }
    }

    // Enemy shooting
    for(let i = 0; i < game.enemyShootingArray.length; i++){

        if(game.enemyShootingArray[i] != null){

            game.enemyShootingArray[i].shoot();
            if(game.enemyShootingArray[i].y > game.canvas.height){
                game.enemyShootingArray[i] = null;
            }
        }
    }
    // Enemy
    for(let i = 0; i < game.enemyArray.length; i ++){

        if(game.enemyArray[i] != null){
            game.enemyArray[i].draw();
        }
    }
};

const score = () => {
    game.ctx.save();
    game.ctx.fillStyle = 'white';
    game.ctx.font = 'bold 40px Courier';
    game.ctx.fillText('SCORE: ' + game.score, 30, 40);
    game.ctx.restore();
}



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

            // Sounds
            game.boing = document.getElementById('boing');
            game.playerShoot = document.getElementById('playerShoot');
            game.intro = document.getElementById('intro');
            game.end = document.getElementById('end');



            game.image = new Image();
            game.image.src = 'img/nave.png';
            game.enemyImage = new Image();
            game.enemyImage.src = 'img/enemy.png';

            game.enemyImage.onload = function(){
                for(let i = 0; i < 5; i++){
                    for(let j = 0; j < 10; j ++){
                        game.enemyArray.push(new Enemy(65+80*j, 70+70*i)); // Enemy position
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