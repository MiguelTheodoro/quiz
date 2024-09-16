
import { Dimension } from "./Dimension.js"

import { $Question } from "../Type/Question"


export class Question extends Dimension implements $Question {

    public constructor(element: string, style: string, private content?: string ){ super("h1", style) }


    public Content(value: string): void {

        this.content           = value
        this.element.innerHTML = value

    }


    public Deconstruct(): void {

        this.element.remove()

    }

}


