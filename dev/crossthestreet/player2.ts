class Player2{

    private player:HTMLElement
    private x:number = window.innerWidth -100
    private y:number = 700
    private speedLeft: number = 0
    private speedRight: number = 0
    private speedUp: number = 0
    private speedDown: number = 0
    private lives:number = 3

    private frames = 3
    private frame = 0
    private framewidth = 50
    private speedcounter = 0
    


    constructor(){
        this.frame = 0

     
        this.player = document.createElement("player")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.player)
        

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

    }

    onKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowLeft":
                this.speedLeft = 10
                this.jumpleft()

                break
            case "ArrowRight":
                this.speedRight = 10
                this.jumpright()

                break
            case "ArrowUp":
                this.speedUp = 10
                this.jumpup()

                break
            case "ArrowDown":
                this.speedDown = 10
                this.jumpdown()

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
                this.speedDown = 0
                break
        }
    }



    public hitByCar(){
        // this.downSpeed = 0
        // this.speedUp = 0
         this.lives - 1
     }

    public update(){

        let newY = this.y - this.speedUp + this.speedDown
        if (newY > 0 && newY < window.innerHeight) {
        this.y = newY
        }

        let newX = this.x - this.speedLeft + this.speedRight
        if (newX > 0 && newX < window.innerWidth)
        {this.x = newX}

        
        // positie van auto kan je veranderen met x y
        this.player.style.transform = `translate(${this.x}px, ${this.y}px)`


    }

    private jumpdown(){
        this.speedcounter++
        if(this.speedcounter%4 == 0) this.frame++
        // check if this frame exists or go to frame 0
        if(this.frame >= this.frames) this.frame = 0
        // position of the spritesheet image
        let pos = 0 - (this.frame*this.framewidth)
        this.player.style.backgroundPosition = pos + 'px -0px'
    }

    private jumpleft(){
        this.speedcounter++
        if(this.speedcounter%4 == 0) this.frame++
        // check if this frame exists or go to frame 0
        if(this.frame >= this.frames) this.frame = 0
        // position of the spritesheet image
        let pos = 0 - (this.frame*this.framewidth)
        this.player.style.backgroundPosition = pos + 'px -50px'
    }

    private jumpright(){
        this.speedcounter++
        if(this.speedcounter%4 == 0) this.frame++
        // check if this frame exists or go to frame 0
        if(this.frame >= this.frames) this.frame = 0
        // position of the spritesheet image
        let pos = 0 - (this.frame*this.framewidth)
        this.player.style.backgroundPosition = pos + 'px -100px'
    }

    private jumpup(){
        this.speedcounter++
        if(this.speedcounter%4 == 0) this.frame++
        // check if this frame exists or go to frame 0
        if(this.frame >= this.frames) this.frame = 0
        // position of the spritesheet image
        let pos = 0 - (this.frame*this.framewidth)
        this.player.style.backgroundPosition = pos + 'px -150px'
    }

    public getRectangle() {
        return this.player.getBoundingClientRect()
    }
}