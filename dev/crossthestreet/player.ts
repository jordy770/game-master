class Player{

    private player:HTMLElement
    private x:number = 0
    private y:number = 0
    private speedLeft: number = 0
    private speedRight: number = 0
    private speedUp: number = 0
    private speedDown: number = 0
    private lives:number = 3

    private gamescreen:GameScreen
    


    constructor(g:GameScreen){
        this.gamescreen = g
        this.player = document.createElement("player")

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

    }

    onKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowLeft":
                this.speedLeft = 10
                break
            case "ArrowRight":
                this.speedRight = 10
                break
            case "ArrowUp":
                this.speedUp = 50
                break
            case "ArrowDown":
                this.speedUp = 50
                break
        }
    }

    onKeyUp(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowLeft":
                this.speedLeft = 0
                break
            case "ArrowRight":
                this.speedRight = 0
                break
            case "ArrowUp":
                this.speedUp = 0
                break
            case "ArrowDown":
                this.speedUp = 0
                break
        }
    }

    

    public hitCar(){
        // this.downSpeed = 0
        // this.speedUp = 0
         this.lives - 1
     }

    public update(){

        let newY = this.y - this.speedUp || this.y + this.speedDown
        if (newY > 0 && newY < window.innerHeight) this.y = newY

        let newX = this.x - this.speedRight || this.x + this.speedLeft
        if (newX > 0 && newX < window.innerWidth) this.x = newX
        
        // positie van auto kan je veranderen met x y
        this.player.style.transform = `translate(${this.x}px, ${this.y}px)`


    }


    public getRectangle() {
        return this.player.getBoundingClientRect()
    }
}