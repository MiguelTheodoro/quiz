
import { $Dimension } from "../Type/Dimension"


export class Dimension implements $Dimension {
    [x: string]: any

    protected element: HTMLElement

    public constructor(element: string, style: string | { [property: string]: string }){

        this.element = window.document.createElement(element)

        this.Aesthetic(style)

    }

    public Event(type: string, callback: EventListenerOrEventListenerObject, remove: boolean = false): void {

        if(remove)
            return this.element.removeEventListener(type, callback)

        this.element.addEventListener(type, callback)

    }


    public Text(value: string): void {

        this.element.innerHTML = value

    }


    public Append(father: HTMLElement): Dimension {

        father.appendChild(this.element);

        return this

    }


    public Mask(style: { [property: string]: string }): void{

        for(const property in style)

            this.element.style[property as any] = style[property]

    }


    public Mark(property: string, value: string): void {

        this.element.setAttribute(property, value)

    }


    public Aesthetic(style: string | { [property: string]: string }): void{

        typeof style === "string" ? this.Mark("class", style) : this.Mask(style)

    }


    public get Element(): HTMLElement {

        return this.element

    }

}