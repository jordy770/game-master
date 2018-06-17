class GameOver {
    private textfield: HTMLElement

    private game:Game

    constructor(g:Game) {
        this.game = g
        this.textfield = document.createElement("textfield")
        document.body.appendChild(this.textfield)
        // this.textfield.addEventListener("click", ()=> this.switchScreens())
        
    }
    public update() { 
        this.textfield.innerHTML =  " GAME OVER, MAN!"
    }
//     private switchScreens(){
//         this.game.emptyScreen()
//         this.game.showScreen(new StartScreen(this.game))
//     }
// }