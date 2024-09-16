import { $Switch } from "../Type/Switch"
import { Dimension } from "./Dimension.js"


export class Switch extends Dimension implements $Switch {

    private action: (state: boolean) => any = (state: boolean) => null

    public constructor(element: string, style: string | { [property: string]: string }, private state: boolean = false){ super(element, style )}


    public Swap(): boolean {

        return this.state = !this.state

    }


    public Action(event: string, method: (state: boolean) => any): void {

        this.action = method

        this.Event(event, this.Method.bind(this))

    }


    public Method(event: any): any {

        if(!this.action)
            return

        return this.action(this.Swap())

    }

}


