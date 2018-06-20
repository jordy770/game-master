# game-master
Game voor Programmeren!!
Lets edit something!
- https://jordy770.github.io/game-master/

# Beoordeling
### PeerReview Sven Koene https://github.com/Sven-Koene/programmeren4

- [x] De code van het individuele project staat op GitHub.
- [x] De game is online speelbaar.
- [x] De game bevat minimaal één van de onderstaande extra uitdagingen.
- [x] De game heeft een startscherm en een eindscherm.
- [x] Er zijn geen bugs.
- [x] Het project maakt gebruik van deze OOP principes.
    - [x] Classes
    - [x] Encapsulation
    - [x] Composition
    - [x] Inheritance
- [x] De GitHub pagina bevat een ReadMe bestand. Dit bestand bevat:
    - [x] Per bovengenoemd OOP principe een uitleg: waar is het toegepast, en waarom is het
        op die plek toegepast. De uitleg is inclusief code voorbeelden.
    - [x] Een klassendiagram van de game.
    - [x] Een link naar de peer review die in week 6 is gedaan

### Extra opdrachten 

- [x] De game ziet er zeer verzorgd uit dankzij goed uitgewerkt UI design en artwork.
- [ ] De game bevat een hiscore lijst. Scores worden bewaard nadat de game is afgesloten.
- [ ] De game werkt met Canvas in plaats van DOM elementen
- [x] De game bevat local of online multiplayer.
- [ ] De game werkt op mobiele schermen en ondersteunt touchscreen controls.
- [ ] De game maakt gebruik van device api's zoals de camera, microfoon, gyroscoop of GPS.
- [ ] De game gebruikt een externe library uit de lijst in deze modulewijzer. 

# Toelichting OOP principes
## Classes
In mijn game maak ik gebruik van classes, Classes zijn eigenlijk de hoofdprinciepe van OOP (Object georienteerd Programmeren) omdat dit handig is om alle onderdelen geschrijden van elkaar te houden. Hierdoor crëeer je meer duidelijkheid. Dat kan je zien de DEV map in mijn repository eigenlijk alle onderdelen hier bevatten classes. Hier een klein voorbeeld:
```
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
}
```

## Encapsulation
Encapsulation gebruik je wanneer je iets wil wilt beschremen, want niet alle bestanden hoeven te weten wat de snelheid is van de player. Hiervoor gebruik je dus Encapsulation voor, er zijn verschillende manieren om daarvoor te zorgen de mogelijkheden zijn: 'public', 'private' en 'protected'. <br/>
Hier een voorbeeld: <br/>
- Ik maak hier gebruik van protected om de speed en de car door te geven aan een andere class zodat de andere classes deze kunnen her gebruiken.
- Private gebruik ik hier om de x en y as te bepalen voor de gameObjecten deze is niet protected omdat ik deze niet vaker hoef aan te passen omdat ze hetzelfde zijn.
- 
```
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
```
## Composition
## Inheritance

In een game wordt inheritance gebruikt wanneer er meerder objecten veel van dezelfde code gebruiken. In mijn game heb ik dit gebruikt bij de bommen en ballen. Ook bij de players heb ik dit gebruikt. Er wordt een class gemaakt waar alle code instaat. Het is zo geschreven dat alle eigenschappen veranderd kunnen worden. Daarna worden er classes gemaakt voor de individuele items. Hierin komen alleen de eigenschappen in te staan. Dit ziet er als volgt uit :


# Klassendiagram

# Peer reviews
