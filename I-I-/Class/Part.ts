
import { $Part } from "../Type/Part"

import { Dimension } from "./Dimension.js"


export class Part extends Dimension  implements $Part {

    public constructor(element: string, style: string, private identitiy: string, private content: string){

        super(element, style)

        this.element.innerHTML = content

    }


    public State(value: -1 | 0 | 1): void {

        if(!value)
            return this.Incorrect()

        if(value == 1)
            return  this.Correct()

        return this.Empty()

    }


    public Empty(): void {

        this.Mask({ backgroundColor:  "var(--theme-scarse-empty)", color: "var( --theme-plentiful-empty)" })

    }


    public Correct(): void {

        this.Mask({ backgroundColor:  "var(--theme-scarse-welcome)", color: "var( --theme-plentiful-welcome)" })

    }


    public Incorrect(): void {

        this.Mask({ backgroundColor: "var( --theme-scarse-error)", color: "var( --theme-plentiful-error)"})

    }


    public Deconstruct(): void {

        this.element.remove()

    }


    public get Identity(): string {

        return this.identitiy

    }


    public get Content(): string {

        return this.content

    }

}


