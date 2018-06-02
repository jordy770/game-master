class Car{

    private car: HTMLElement
  

        
    private gamescreen:GameScreen
    
    
    constructor(g:GameScreen){
        this.gamescreen = g
        
        this.car = document.createElement("car")
              
    
        }

        public update(){
        
        }

        public getRectangle() {
            return this.car.getBoundingClientRect()
        }

}