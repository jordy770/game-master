class Car{

    private car: HTMLElement
    private x:number
    private y:number
    private speed:number

    
    
    constructor(){      
     
        this.car = document.createElement("car")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.car)
        this.speed = 4 + Math.random() * 8
        this.x = window.innerWidth - 500
        this.y = -400 - (Math.random() * 450) 
        }

        public update(): void{
            this.y += this.speed
            this.car.style.transform = `translate(${this.x}px, ${this.y}px)`
        }

        public getRectangle() {
            return this.car.getBoundingClientRect()
        }

        public reset(){
            this.x = 100 + (Math.random() * (window.innerWidth - 200))
            this.y = -400 - (Math.random() * 450) 
        }

}