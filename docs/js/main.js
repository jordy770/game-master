"use strict";
var Game = (function () {
    function Game() {
        this.currentscreen = new StartScreen(this);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.currentscreen.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.emptyScreen = function () {
        var game = document.getElementsByTagName("game")[0];
        game.innerHTML = "";
    };
    Game.prototype.showScreen = function (screen) {
        this.currentscreen = screen;
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var GameOver = (function () {
    function GameOver() {
        this.textfield = document.createElement("textfield");
        document.body.appendChild(this.textfield);
    }
    GameOver.prototype.update = function () {
        this.textfield.innerHTML = "GAME OVER, MAN!";
    };
    return GameOver;
}());
var StartScreen = (function () {
    function StartScreen(g) {
        var _this = this;
        this.addNumbers(2, 3);
        this.game = g;
        this.textfield = document.createElement("textfield");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.textfield);
        this.textfield.addEventListener("click", function () { return _this.switchScreens(); });
    }
    StartScreen.prototype.addNumbers = function (a, b) {
        console.log(a + b);
    };
    StartScreen.prototype.update = function () {
        this.textfield.innerHTML = "START THE GAME - dit is het startscreen";
    };
    StartScreen.prototype.switchScreens = function () {
        this.game.emptyScreen();
        this.game.showScreen(new GameScreen(this.game));
    };
    return StartScreen;
}());
var Car = (function () {
    function Car(g) {
        this.gamescreen = g;
        this.car = document.createElement("car");
    }
    Car.prototype.update = function () {
    };
    Car.prototype.getRectangle = function () {
        return this.car.getBoundingClientRect();
    };
    return Car;
}());
var GameScreen = (function () {
    function GameScreen(g) {
        this.hitByCar = 0;
        this.game = g;
        this.player = new Player(this);
        this.car = new Car(this);
    }
    GameScreen.prototype.update = function () {
        this.player.update();
        this.car.update();
        if (this.checkCollision(this.player.getRectangle(), this.car.getRectangle())) {
            this.player.hitCar();
        }
        if (this.checkCollision(this.player.getRectangle(), this.car.getRectangle())) {
            this.hitByCar--;
            if (this.hitByCar <= 0) {
                this.game.emptyScreen();
                this.game.showScreen(new GameOver());
            }
        }
    };
    GameScreen.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return GameScreen;
}());
var Player = (function () {
    function Player(g) {
        var _this = this;
        this.x = 0;
        this.y = 0;
        this.speedLeft = 0;
        this.speedRight = 0;
        this.speedUp = 0;
        this.speedDown = 0;
        this.lives = 3;
        this.gamescreen = g;
        this.player = document.createElement("player");
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Player.prototype.onKeyDown = function (event) {
        switch (event.key) {
            case "ArrowLeft":
                this.speedLeft = 10;
                break;
            case "ArrowRight":
                this.speedRight = 10;
                break;
            case "ArrowUp":
                this.speedUp = 50;
                break;
            case "ArrowDown":
                this.speedUp = 50;
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
        switch (event.key) {
            case "ArrowLeft":
                this.speedLeft = 0;
                break;
            case "ArrowRight":
                this.speedRight = 0;
                break;
            case "ArrowUp":
                this.speedUp = 0;
                break;
            case "ArrowDown":
                this.speedUp = 0;
                break;
        }
    };
    Player.prototype.hitCar = function () {
        this.lives - 1;
    };
    Player.prototype.update = function () {
        var newY = this.y - this.speedUp || this.y + this.speedDown;
        if (newY > 0 && newY < window.innerHeight)
            this.y = newY;
        var newX = this.x - this.speedRight || this.x + this.speedLeft;
        if (newX > 0 && newX < window.innerWidth)
            this.x = newX;
        this.player.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Player.prototype.getRectangle = function () {
        return this.player.getBoundingClientRect();
    };
    return Player;
}());
//# sourceMappingURL=main.js.map