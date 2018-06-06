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
    function Car() {
        this.car = document.createElement("car");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(this.car);
        this.speed = 4 + Math.random() * 8;
        this.x = window.innerWidth - 500;
        this.y = -400 - (Math.random() * 450);
    }
    Car.prototype.update = function () {
        this.y += this.speed;
        this.car.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Car.prototype.getRectangle = function () {
        return this.car.getBoundingClientRect();
    };
    Car.prototype.reset = function () {
        this.x = 100 + (Math.random() * (window.innerWidth - 200));
        this.y = -400 - (Math.random() * 450);
    };
    return Car;
}());
var GameScreen = (function () {
    function GameScreen(g) {
        this.hitByCar = 0;
        this.game = g;
        this.player = new Player(this);
        this.cars = [new Car(), new Car(), new Car(), new Car()];
    }
    GameScreen.prototype.update = function () {
        this.player.update();
        for (var _i = 0, _a = this.cars; _i < _a.length; _i++) {
            var c = _a[_i];
            c.update();
            if (this.checkCollision(this.player.getRectangle(), c.getRectangle())) {
                c.reset();
                this.player.hitByCar();
                if (this.hitByCar <= 0) {
                    this.game.emptyScreen();
                    this.game.showScreen(new GameOver());
                }
            }
            if (c.getRectangle().bottom - c.getRectangle().height > window.innerHeight) {
                c.reset();
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
        this.x = 10;
        this.y = 10;
        this.speedLeft = 0;
        this.speedRight = 0;
        this.speedUp = 0;
        this.speedDown = 0;
        this.lives = 3;
        this.gamescreen = g;
        this.player = document.createElement("player");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(this.player);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Player.prototype.onKeyDown = function (event) {
        switch (event.key) {
            case "a":
                this.speedLeft = 10;
                break;
            case "d":
                this.speedRight = 10;
                break;
            case "w":
                this.speedUp = 10;
                break;
            case "s":
                this.speedDown = 10;
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
        switch (event.key) {
            case "a":
                this.speedLeft = 0;
                break;
            case "d":
                this.speedRight = 0;
                break;
            case "w":
                this.speedUp = 0;
                break;
            case "s":
                this.speedDown = 0;
                break;
        }
    };
    Player.prototype.hitByCar = function () {
        this.lives - 1;
    };
    Player.prototype.update = function () {
        var newY = this.y - this.speedUp + this.speedDown;
        if (newY > 0 && newY < window.innerHeight) {
            this.y = newY;
        }
        var newX = this.x - this.speedLeft + this.speedRight;
        if (newX > 0 && newX < window.innerWidth) {
            this.x = newX;
        }
        this.player.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Player.prototype.getRectangle = function () {
        return this.player.getBoundingClientRect();
    };
    return Player;
}());
//# sourceMappingURL=main.js.map