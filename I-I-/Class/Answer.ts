import { $Answer } from "../Type/Answer"
import { $Assessment } from "../Type/Assessment"
import { $Part } from "../Type/Part"

import { Dimension } from "./Dimension.js"
import { Part } from "./Part.js"


export class Answer extends Dimension implements $Answer {

    public constructor(element: string, style: string, private content?: Record<string, string>, private part: Record<string, Part> = {}){ super(element, style) }

    public Content(value: Record<string, string>): void {

        for(const identity in value)

            this.part[identity] = new Part("li", "style-answer", identity, value[identity])


        for(const identity in value)

            this.part[identity].Append(this.element)


        this.content = value

    }


    public Bind(assessment: $Assessment): void {

        for(const identity in this.part)

            this.part[identity].Event("click", () => assessment.Rate.bind(assessment)(this.part[identity]))

    }


    public Break(assessment: $Assessment): void {

        for(const identity in this.part)

            this.part[identity].Mask({ pointerEvents: "none" })

    }


    public Part(identity: number): $Part {

        return this.part[identity]

    }


    public Deconstruct(): void {

        for(const identity in this.part)

            this.part[identity].Deconstruct()

    }


    public AutoDeconstruct(): void {

        this.element.remove()

    }

}

