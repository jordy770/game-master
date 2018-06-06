class GameScreen{

    private player:Player
    private cars:Car[]
    // private foreground:HTMLElement
    private game:Game
    private hitByCar:number = 0

    

    constructor(g:Game){

        this.game = g

        this.player = new Player(this)
        this.cars = [new Car(), new Car(), new Car(), new Car()]

    }



    public update():void {
        this.player.update()       
        
        for (let c of this.cars){
            c.update()
      
        
        if (this.checkCollision(this.player.getRectangle(), c.getRectangle())) {
            c.reset()
            this.player.hitByCar()
            if(this.hitByCar <= 0){
                this.game.emptyScreen()
                this.game.showScreen(new GameOver())
            }
        }

        if (c.getRectangle().bottom - c.getRectangle().height > window.innerHeight) {
            c.reset()
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

