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
        for(let car of this.gameObjects) {
            if (car instanceof Car) {
                for(let rock of this.gameObjects) {
                    if (rock instanceof Rock){
                        if(this.hasCollision(car, rock)) {
                            rock.crashed(car.Speed)
                            car.crash()
                            this.gameOver()
                        }
                    }   
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

    protected hasCollision(rect1 : Car, rect2 : Rock) : boolean {
        return (rect1.X < rect2.X + rect2.width &&
                rect1.X + rect1.width > rect2.X &&
                rect1.Y < rect2.Y + rect2.height &&
                rect1.Y + rect1.height > rect2.Y)
    }
} 

// load
window.addEventListener("load", () => new Game() )