class Car{

    protected car: HTMLElement
    private x:number
    private y:number
    protected speed:number

    
    
    constructor(){      
     
        this.car = document.createElement("carRed")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.car)
        this.speed = 4 + Math.random() * 8
        this.x = window.innerWidth - 500
        this.y = (Math.random() * 450) 
        }

        public update(): void{
            this.y += this.speed
            this.car.style.transform = `translate(${this.x}px, ${this.y}px)`
        }

        public getRectangle() {
            return this.car.getBoundingClientRect()
        }

        public reset(){
            this.x =  (Math.random() * (window.innerWidth - 150))
            this.y = -400 - (Math.random() * 450) 
        }

}