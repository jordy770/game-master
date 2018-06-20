"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    function GameOver(g) {
        this.game = g;
        this.textfield = document.createElement("textfield");
        document.body.appendChild(this.textfield);
    }
    GameOver.prototype.update = function () {
        this.textfield.innerHTML = " GAME OVER, MAN!";
    };
    return GameOver;
}());
var StartScreen = (function () {
    function StartScreen(g) {
        var _this = this;
        this.addNumbers(2, 3);
        this.game = g;
        this.textfield = document.createElement("start1P");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.textfield);
        this.textfield.addEventListener("click", function () { return _this.switchScreens1P(); });
        this.textfield.innerHTML = "start 1P";
        this.textfield2 = document.createElement("start2P");
        var foreground2 = document.getElementsByTagName("foreground")[0];
        foreground2.appendChild(this.textfield2);
        this.textfield2.addEventListener("click", function () { return _this.switchScreens2P(); });
        this.textfield2.innerHTML = "start 2P";
    }
    StartScreen.prototype.addNumbers = function (a, b) {
        console.log(a + b);
    };
    StartScreen.prototype.update = function () {
    };
    StartScreen.prototype.switchScreens1P = function () {
        this.game.emptyScreen();
        this.game.showScreen(new GameScreen(this.game));
    };
    StartScreen.prototype.switchScreens2P = function () {
        this.game.emptyScreen();
        this.game.showScreen(new GameScreen2P(this.game));
    };
    return StartScreen;
}());
var GameObject = (function () {
    function GameObject(tag) {
        this.speed = 0;
        this.car = document.createElement(tag);
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(this.car);
        this.x = Math.random() * (window.innerWidth - 200);
        this.y = -400 - (Math.random() * 450);
    }
    GameObject.prototype.update = function () {
        this.y += this.speed;
        this.car.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        if (this.y + this.car.clientHeight > window.innerHeight) {
            this.reset();
        }
    };
    GameObject.prototype.getRectangle = function () {
        return this.car.getBoundingClientRect();
    };
    GameObject.prototype.reset = function () {
        this.x = Math.random() * (window.innerWidth - 200);
        this.y = -400 - (Math.random() * 450);
    };
    return GameObject;
}());
var Car = (function (_super) {
    __extends(Car, _super);
    function Car() {
        var _this = _super.call(this, "carYellow") || this;
        _this.speed = 15;
        return _this;
    }
    return Car;
}(GameObject));
var GameScreen = (function () {
    function GameScreen(g) {
        this.hitByCar = 0;
        this.score = 0;
        this.game = g;
        this.textfield = document.createElement("textfield");
        document.body.appendChild(this.textfield);
        this.player = new Player1();
        this.cars = [new Blue(), new Yellow(), new Yellow(), new Red(), new Red(), new Red()];
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
                    this.game.showScreen(new GameOver(this.game));
                }
            }
            if (c.getRectangle().bottom - c.getRectangle().height > window.innerHeight) {
                c.reset();
            }
            this.score++;
            this.textfield.innerHTML = "Score = " + this.score;
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
var GameScreen2P = (function () {
    function GameScreen2P(g) {
        this.score = 0;
        this.hitByCar = 0;
        this.game = g;
        this.textfield = document.createElement("textfield");
        document.body.appendChild(this.textfield);
        this.player1 = new Player1();
        this.player2 = new Player2();
        this.cars = [new Blue(), new Yellow(), new Yellow(), new Red(), new Red(), new Red()];
    }
    GameScreen2P.prototype.update = function () {
        this.player1.update();
        this.player2.update();
        for (var _i = 0, _a = this.cars; _i < _a.length; _i++) {
            var c = _a[_i];
            c.update();
            if (this.checkCollision(this.player1.getRectangle(), c.getRectangle())) {
                c.reset();
                this.player1.hitByCar();
                if (this.hitByCar <= 0) {
                    this.game.emptyScreen();
                    this.game.showScreen(new GameOver(this.game));
                }
            }
            if (this.checkCollision(this.player2.getRectangle(), c.getRectangle())) {
                c.reset();
                this.player2.hitByCar();
                if (this.hitByCar <= 0) {
                    this.game.emptyScreen();
                    this.game.showScreen(new GameOver(this.game));
                }
            }
            if (c.getRectangle().bottom - c.getRectangle().height > window.innerHeight) {
                c.reset();
            }
            this.score = this.score + 2;
            this.textfield.innerHTML = "Score = " + this.score;
        }
    };
    GameScreen2P.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return GameScreen2P;
}());
var Player1 = (function () {
    function Player1() {
        var _this = this;
        this.x = 10;
        this.y = 700;
        this.speedLeft = 0;
        this.speedRight = 0;
        this.speedUp = 0;
        this.speedDown = 0;
        this.lives = 3;
        this.frames = 3;
        this.frame = 0;
        this.framewidth = 50;
        this.speedcounter = 0;
        this.frame = 0;
        this.player = document.createElement("player");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(this.player);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Player1.prototype.onKeyDown = function (event) {
        switch (event.key) {
            case "a":
                this.speedLeft = 10;
                this.jumpleft();
                break;
            case "d":
                this.speedRight = 10;
                this.jumpright();
                break;
            case "w":
                this.speedUp = 10;
                this.jumpup();
                break;
            case "s":
                this.speedDown = 10;
                this.jumpdown();
                break;
        }
    };
    Player1.prototype.onKeyUp = function (event) {
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
    Player1.prototype.hitByCar = function () {
        this.lives - 1;
    };
    Player1.prototype.update = function () {
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
    Player1.prototype.jumpdown = function () {
        this.speedcounter++;
        if (this.speedcounter % 4 == 0)
            this.frame++;
        if (this.frame >= this.frames)
            this.frame = 0;
        var pos = 0 - (this.frame * this.framewidth);
        this.player.style.backgroundPosition = pos + 'px -0px';
    };
    Player1.prototype.jumpleft = function () {
        this.speedcounter++;
        if (this.speedcounter % 4 == 0)
            this.frame++;
        if (this.frame >= this.frames)
            this.frame = 0;
        var pos = 0 - (this.frame * this.framewidth);
        this.player.style.backgroundPosition = pos + 'px -50px';
    };
    Player1.prototype.jumpright = function () {
        this.speedcounter++;
        if (this.speedcounter % 4 == 0)
            this.frame++;
        if (this.frame >= this.frames)
            this.frame = 0;
        var pos = 0 - (this.frame * this.framewidth);
        this.player.style.backgroundPosition = pos + 'px -100px';
    };
    Player1.prototype.jumpup = function () {
        this.speedcounter++;
        if (this.speedcounter % 4 == 0)
            this.frame++;
        if (this.frame >= this.frames)
            this.frame = 0;
        var pos = 0 - (this.frame * this.framewidth);
        this.player.style.backgroundPosition = pos + 'px -150px';
    };
    Player1.prototype.getRectangle = function () {
        return this.player.getBoundingClientRect();
    };
    return Player1;
}());
var Player2 = (function () {
    function Player2() {
        var _this = this;
        this.x = window.innerWidth - 100;
        this.y = 700;
        this.speedLeft = 0;
        this.speedRight = 0;
        this.speedUp = 0;
        this.speedDown = 0;
        this.lives = 3;
        this.frames = 3;
        this.frame = 0;
        this.framewidth = 50;
        this.speedcounter = 0;
        this.frame = 0;
        this.player = document.createElement("player");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(this.player);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Player2.prototype.onKeyDown = function (event) {
        switch (event.key) {
            case "ArrowLeft":
                this.speedLeft = 10;
                this.jumpleft();
                break;
            case "ArrowRight":
                this.speedRight = 10;
                this.jumpright();
                break;
            case "ArrowUp":
                this.speedUp = 10;
                this.jumpup();
                break;
            case "ArrowDown":
                this.speedDown = 10;
                this.jumpdown();
                break;
        }
    };
    Player2.prototype.onKeyUp = function (event) {
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
                this.speedDown = 0;
                break;
        }
    };
    Player2.prototype.hitByCar = function () {
        this.lives - 1;
    };
    Player2.prototype.update = function () {
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
    Player2.prototype.jumpdown = function () {
        this.speedcounter++;
        if (this.speedcounter % 4 == 0)
            this.frame++;
        if (this.frame >= this.frames)
            this.frame = 0;
        var pos = 0 - (this.frame * this.framewidth);
        this.player.style.backgroundPosition = pos + 'px -0px';
    };
    Player2.prototype.jumpleft = function () {
        this.speedcounter++;
        if (this.speedcounter % 4 == 0)
            this.frame++;
        if (this.frame >= this.frames)
            this.frame = 0;
        var pos = 0 - (this.frame * this.framewidth);
        this.player.style.backgroundPosition = pos + 'px -50px';
    };
    Player2.prototype.jumpright = function () {
        this.speedcounter++;
        if (this.speedcounter % 4 == 0)
            this.frame++;
        if (this.frame >= this.frames)
            this.frame = 0;
        var pos = 0 - (this.frame * this.framewidth);
        this.player.style.backgroundPosition = pos + 'px -100px';
    };
    Player2.prototype.jumpup = function () {
        this.speedcounter++;
        if (this.speedcounter % 4 == 0)
            this.frame++;
        if (this.frame >= this.frames)
            this.frame = 0;
        var pos = 0 - (this.frame * this.framewidth);
        this.player.style.backgroundPosition = pos + 'px -150px';
    };
    Player2.prototype.getRectangle = function () {
        return this.player.getBoundingClientRect();
    };
    return Player2;
}());
var Blue = (function (_super) {
    __extends(Blue, _super);
    function Blue() {
        var _this = _super.call(this, "carBlue") || this;
        _this.speed = 5;
        return _this;
    }
    return Blue;
}(GameObject));
var Red = (function (_super) {
    __extends(Red, _super);
    function Red() {
        var _this = _super.call(this, "carRed") || this;
        _this.speed = 15;
        return _this;
    }
    return Red;
}(GameObject));
var Yellow = (function (_super) {
    __extends(Yellow, _super);
    function Yellow() {
        var _this = _super.call(this, "carYellow") || this;
        _this.speed = 10;
        return _this;
    }
    return Yellow;
}(GameObject));
//# sourceMappingURL=main.js.map