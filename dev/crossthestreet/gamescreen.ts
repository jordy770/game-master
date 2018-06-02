class GameScreen{

    private player:Player
    private car:Car
    // private foreground:HTMLElement
    private game:Game
    private hitByCar:number = 0
    

    constructor(g:Game){

        this.game = g

        this.player = new Player(this)
        this.car = new Car(this)
    }



    public update():void {

        this.player.update()
        this.car.update()
      
        if (this.checkCollision(this.player.getRectangle(), this.car.getRectangle())) {
           this.player.hitCar()
        }
        
        if (this.checkCollision(this.player.getRectangle(), this.car.getRectangle())) {
            this.hitByCar--
            if(this.hitByCar <= 0){
                this.game.emptyScreen()
                this.game.showScreen(new GameOver())
            }
        }
    }
    
    public checkCollision(a: ClientRect, b: ClientRect): boolean {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }
}

