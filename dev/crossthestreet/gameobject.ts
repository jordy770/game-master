class GameObject{

    protected car: HTMLElement
    private x:number 
    private y:number
    protected speed:number = 0

    
    
    constructor(tag:string){ 

        this.car = document.createElement(tag)
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.car)

        this.x = Math.random() * (window.innerWidth - 200)
        this.y = -400 - (Math.random() * 450)  

        }

        public update(): void{
            this.y += this.speed
            this.car.style.transform = `translate(${this.x}px, ${this.y}px)`

            if (this.y + this.car.clientHeight > window.innerHeight){
                this.reset()
            }
        }

        public getRectangle() {
            return this.car.getBoundingClientRect()
        }

        public reset(){
            this.x =  Math.random() * (window.innerWidth - 200)
            this.y = -400 - (Math.random() * 450) 
        }

}