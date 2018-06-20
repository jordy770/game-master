class GameScreen2P{

    private player1:Player1
    private player2:Player2
    private cars:Car[]
    // private foreground:HTMLElement
    private game:Game
    private score:number = 0
    private hitByCar:number = 0
    private textfield:HTMLElement

    

    constructor(g:Game){

        this.game = g

        this.textfield = document.createElement("textfield")
        document.body.appendChild(this.textfield)

        this.player1 = new Player1()
        this.player2 = new Player2()
        this.cars = [new Blue(), new Yellow(), new Yellow(), new Red(), new Red(), new Red()]

    }



    public update():void {
        this.player1.update()     
        this.player2.update()      
        
        for (let c of this.cars){
            c.update()
      
        
        if (this.checkCollision(this.player1.getRectangle(), c.getRectangle())) {
            c.reset()
            this.player1.hitByCar()
            if(this.hitByCar <= 0){
                this.game.emptyScreen()
                this.game.showScreen(new GameOver(this.game))
            }
        }

        if (this.checkCollision(this.player2.getRectangle(), c.getRectangle())) {
            c.reset()
            this.player2.hitByCar()
            if(this.hitByCar <= 0){
                this.game.emptyScreen()
                this.game.showScreen(new GameOver(this.game))
            }
        }

        if (c.getRectangle().bottom - c.getRectangle().height > window.innerHeight) {
            c.reset()
        }
        this.score = this.score + 2
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

