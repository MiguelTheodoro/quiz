
import { $Answer } from "../Type/Answer"
import { $Assessment } from "../Type/Assessment"
import { $Bank } from "../Type/Bank"
import { $Part } from "../Type/Part"
import { $Score } from "../Type/Score"
import { $Segment } from "../Type/Segment"
import { $Question } from "../Type/Question"

import { Dimension } from "./Dimension.js"


export class Assessment extends Dimension implements $Assessment {

    public constructor(element: string, style: string, private question: $Question, private answer: $Answer, private bank: $Bank, private score: $Score, private time: $Segment){

        super(element, style)

        this.Become()

        this.Next()

    }


    private Become(){

        for(const entity of ["question", "answer"])

            this[entity as "question" | "answer"].Append(this.element)

    }


    public View(entity: "question" | "answer", target: string){

        this[entity].Append( window.document.querySelector(target) as HTMLElement)

    }


    public Rate(part: $Part): void {

        this.time.Stop()

        const { value, done } = this.bank.Present()

        const state = part.Identity == value.correct


        if(state)
            this.score.More(value.score)

        else
            part.State(0)


        this.Result(1)

    }


    public Result(state: -1 | 0 |  1){

        const { value, done } = this.bank.Present() as { value: { question: string, answer: Record<string, string>, time: number, correct: number } , done: boolean }

        this.answer.Part(value.correct).State(state)

        this.answer.Break(this)

        setTimeout(this.Next.bind(this), 2000)

    }


    public Overflow(){

        this.answer.AutoDeconstruct()
        this.question.Deconstruct()

        this.time.Descontruct()

        this.Mask({ flexDirection: "row" })

        this.Text(`

            <table class="style-table">
                <tbody>
                    <tr class="style-property">
                        <td class="style-key">Total</td>
                        <td class="style-value">${this.score.Max}</td>
                    </tr>
                    <tr class="style-property">
                        <td class="style-table-head-cell">Correct</td>
                        <td class="style-table-head-cell">Porcent</td>

                    </tr>
                    <tr class="style-property">
                        <td class="style-table-cell">${this.score.Value}</td>
                        <td class="style-table-cell">${(this.score.Value / this.score.Max * 100).toFixed(2)}%</td>
                    </tr>
                    <tr class="style-property">
                        <td class="style-table-cell-button" colspan="2" onclick="window.location.reload()">Reload</td>
                    </tr>
                </tbody>

            </table>




        `)

    }

    public Next(): void {

        this.answer.Deconstruct()

        const { value, done } = this.bank.Next() as { value: { question: string, answer: Record<string, string>, time: number, correct: string } , done: boolean }


        if(done)
            return this.Overflow()

        this.question.Content(value.question)

        this.answer.Content(value.answer)
        this.answer.Bind(this)

        this.time.Emit(this.Result.bind(this), -1)


        this.time.Animation(value.time)

    }

}

