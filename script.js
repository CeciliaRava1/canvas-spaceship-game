game = {
    canvas: null,
    ctx: null
}

let positionX = 100, positionY = 100;


const animate = () => {
    requestAnimationFrame(animate);
    verifyPosition();
    draw();

}

const verifyPosition = () => {
    positionX += 2;
    if(positionX > game.canvas.width) positionX = 0;

}

const draw = () => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.ctx.fillStyle = 'red';
    game.ctx.beginPath();
    game.ctx.arc(positionX, positionY, 5, 0, 2 * Math.PI);
    game.ctx.fill();

}



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
            animate();


        } else{
            alert('Your browser does not support canvas')
        }
    
    
    
    }
}