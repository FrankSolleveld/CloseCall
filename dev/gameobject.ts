class GameObject extends HTMLElement {

    private x       : number    = 0
    private y       : number    = 0

    public get X()      : number    { return this.x    }
	public set X(value  : number)   { this.x = value   }

	public get Y()      : number    { return this.y    }
	public set Y(value  : number)   { this.y = value   }


    public get width()  : number    { return this.clientWidth }
    public get height() : number    { return this.clientHeight }

    constructor(){
        super()
    }

    private hasCollision(rect1 : Car, rect2 : Rock) : boolean {
        return (rect1.X < rect2.X + rect2.width &&
                rect1.X + rect1.width > rect2.X &&
                rect1.Y < rect2.Y + rect2.height &&
                rect1.Y + rect1.height > rect2.Y)
    }
    
}