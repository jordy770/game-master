class GameScreen{

    private player:Player1
    private cars:Car[]
    // private foreground:HTMLElement
    private game:Game
    private hitByCar:number = 0
    private score:number = 0
    private textfield:HTMLElement

    

    constructor(g:Game){

        this.game = g

        this.textfield = document.createElement("textfield")
        document.body.appendChild(this.textfield)

        this.player = new Player1()
        this.cars = [new Blue(), new Yellow(), new Yellow(), new Red(), new Red(), new Red()]

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
                this.game.showScreen(new GameOver(this.game))
            }
        }

        if (c.getRectangle().bottom - c.getRectangle().height > window.innerHeight) {
            c.reset()
        }
        this.score++
        this.textfield.innerHTML = "Score = " + this.score
    }
}
    
    public checkCollision(a: ClientRect, b: ClientRect): boolean {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }
}

