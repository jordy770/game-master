class StartScreen {

    private textfield: HTMLElement
    private textfield2: HTMLElement

    private game : Game

    private addNumbers(a:number, b:number){
        console.log( a + b )
    }

    constructor(g:Game) {
        this.addNumbers(2,3)

        this.game = g
        this.textfield = document.createElement("start1P")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.textfield)
        this.textfield.addEventListener("click", ()=> this.switchScreens1P())
        this.textfield.innerHTML = "start 1P"



        this.textfield2 = document.createElement("start2P")
        let foreground2 = document.getElementsByTagName("foreground")[0]
        foreground2.appendChild(this.textfield2)
        this.textfield2.addEventListener("click", ()=> this.switchScreens2P())
        this.textfield2.innerHTML = "start 2P"
        
    }

    public update() {
    
    }

    private switchScreens1P(){
        this.game.emptyScreen()
        this.game.showScreen(new GameScreen(this.game))
    }

    private switchScreens2P(){
        this.game.emptyScreen()
        this.game.showScreen(new GameScreen2P(this.game))
    }

}