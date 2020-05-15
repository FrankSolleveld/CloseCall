class Game {

    // Fields
    private gameObjects: GameObject[] = []
    private score   : number    = 0
    private request : number    = 0
    private gameover: boolean   = false


    constructor() {
        for(let i = 0 ; i < 6 ; i++) {
            this.addCarWithRock(i)
        }

        this.gameLoop()
    }

    private addCarWithRock(index : number) {
        this.gameObjects.push(new Car(index, this))
        this.gameObjects.push(new Rock(index))
    }

    private gameLoop(){
        for(let gameObject of this.gameObjects){
            if (gameObject instanceof Car || gameObject instanceof Rock) {
                gameObject.move()
            } 
        }
        this.checkCollision()
        
        this.request = requestAnimationFrame(() => this.gameLoop())
    }

    private checkCollision() {
        for(let car of this.cars) {
            for(let rock of this.rocks) {
                if(this.hasCollision(car, rock)) {
                    rock.crashed(car.Speed)
                    car.crash()
                    this.gameOver()
                }
            }
        }
    }

    private gameOver() : void{
        this.gameover = true
        document.getElementById("score").innerHTML = "Game Over"
        cancelAnimationFrame(this.request)
    }

    public addScore(x : number){
        if(!this.gameover) {
            this.score += Math.floor(x)
            this.draw()
        }
    }

    private draw() {
        document.getElementById("score").innerHTML = "Score : "+this.score
    }
} 

// load
window.addEventListener("load", () => new Game() )