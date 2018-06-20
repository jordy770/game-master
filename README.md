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

- [ ] De game ziet er zeer verzorgd uit dankzij goed uitgewerkt UI design en artwork.
- [ ] De game bevat een hiscore lijst. Scores worden bewaard nadat de game is afgesloten.
- [ ] De game werkt met Canvas in plaats van DOM elementen
- [x] De game bevat local of online multiplayer.
- [ ] De game werkt op mobiele schermen en ondersteunt touchscreen controls.
- [ ] De game maakt gebruik van device api's zoals de camera, microfoon, gyroscoop of GPS.
- [ ] De game gebruikt een externe library uit de lijst in deze modulewijzer. 

# Toelichting OOP principes
## Classes
## Encapsulation
## Composition
## Inheritance

In een game wordt inheritance gebruikt wanneer er meerder objecten veel van dezelfde code gebruiken. In mijn game heb ik dit gebruikt bij de bommen en ballen. Ook bij de players heb ik dit gebruikt. Er wordt een class gemaakt waar alle code instaat. Het is zo geschreven dat alle eigenschappen veranderd kunnen worden. Daarna worden er classes gemaakt voor de individuele items. Hierin komen alleen de eigenschappen in te staan. Dit ziet er als volgt uit :
```
///<reference path="fallingObject.ts"/>

class Ball extends fallingObject{
    
    public constructor() {
        super("ball")
        
        this._speed = 5    
    }   
}
```
In bovenstaande code wordt een snelheid en een tag meegegeven. Die worden in de class fallingObject gebruikt om het item te maken.

```
class fallingObject {
    protected _speed:number = 0;            
    private x:number          
    private y:number          
    private htmlElement:HTMLElement;  

        
    public constructor(tag:string) {

        this.htmlElement = document.createElement(tag)
    	document.body.appendChild(this.htmlElement)
        ...
    }

    public update():void {
        this.y += this._speed
        this.htmlElement.style.transform = `translate(${this.x}px, ${this.y}px)`
        
        if (this.y + this.htmlElement.clientHeight > window.innerHeight){
            this.reset()
        }
    }

    ...
}
```



# Klassendiagram

# Peer reviews
