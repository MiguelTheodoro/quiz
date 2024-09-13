class Dimension {

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


    public get Element(){ return this.element }

    public Text(value: string): void { this.element.innerHTML = value }

    public Append(father: HTMLElement){ father.appendChild(this.element); return this }

    public Mask(style: { [property: string]: string }){ for(const property in style) this.element.style[property as any] = style[property] }

    public Mark(property: string, value: string): void { this.element.setAttribute(property, value) }

    public Aesthetic(style: string | { [property: string]: string }){ typeof style === "string" ? this.Mark("class", style) : this.Mask(style) }

}







class Bank {

    public constructor(private value: $Question[], private present?: any, private interator?: Generator){

        this.interator = this.Generator()

    }

    private* Generator(){  for(const content of this.value) yield content }

    public Present(){ return this.present }

    public Next(): IteratorResult<{ value: any, done: boolean } > { return this.present = this.interator?.next() as { value: any, done: boolean } }

}


class Score {

    public constructor(private value: number, private max: number, private segment: Segment){}

    public More(value: number): void {

        this.value += value

        this.segment.Mute(value)

    }

    public Zero(): void { this.value = 0 }

    public get Max(): number { return this.max }

    public get Value(): number { return this.value }

}

class Assessment extends Dimension {

    public constructor(element: string, style: string, private question: Question, private answer: Answer, private bank: Bank, private score: Score, private time: Segment){

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


    public Rate(part: Part): void {

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




class Question extends Dimension {

    public constructor(element: string, style: string, private content?: string ){ super("h1", style) }

    public Content(value: string){

        this.content           = value
        this.element.innerHTML = value

    }

    public Deconstruct(): void { this.element.remove() }

}

class Answer extends Dimension {

    public constructor(element: string, style: string, private content?: Record<string, string>, private part: Record<string, Part> = {}){ super(element, style) }

    public Content(value: Record<string, string>): void {

        for(const identity in value)

            this.part[identity] = new Part("li", "style-answer", identity, value[identity])


        for(const identity in value)

            this.part[identity].Append(this.element)


        this.content = value

    }

    public Bind(assessment: Assessment): void {

        for(const identity in this.part)

            this.part[identity].Event("click", () => assessment.Rate.bind(assessment)(this.part[identity]))


    }

    public Break(assessment: Assessment): void {

        for(const identity in this.part)

            this.part[identity].Mask({ pointerEvents: "none" })  //this.part[identity].Event("click", () => assessment.Rate.bind(assessment)(this.part[identity]), true)


    }

    public Part(identity: number){

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

class Part extends Dimension {


    public constructor(element: string, style: string, private identitiy: string, private content: string){

        super(element, style)

        this.element.innerHTML = content


    }


    public get Identity(): string { return this.identitiy }

    public get Content(): string { return this.content }


    public State(value: -1 | 0 | 1): void {

        if(!value)
            return this.Incorrect()

        if(value == 1)
            return  this.Correct()

        return this.Empty()

    }

    public Empty(): void { this.Mask({ backgroundColor:  "var(--theme-scarse-empty)", color: "var( --theme-plentiful-empty)" }) }

    public Correct(): void { this.Mask({ backgroundColor:  "var(--theme-scarse-welcome)", color: "var( --theme-plentiful-welcome)" }) }

    public Incorrect(): void { this.Mask({ backgroundColor: "var( --theme-scarse-error)", color: "var( --theme-plentiful-error)"}) }

    public Deconstruct(): void { this.element.remove() }

}





class Segment extends Dimension {

    private property: { scale: number, size: string, identity: number, emit: { callback: (parameter?: any) => any, parameter: any }} = { scale: 0, size: '', identity: 0, emit: { callback: () => null , parameter: null}}


    private components: Record<"symbol" | "segment" | "progress", null | Dimension> = { symbol: null, segment: null , progress: null }

    public constructor(private direction: "width" | "height", private rule: (scale: number) => number, private symbol: string, private style: Record<"symbol" | "segment" | "progress" | "container", string | Record<string, string>>){ super("ul", style.container); this.Become() }

    public Become(): void {

        this.components.symbol   = new Dimension("li", this.style.symbol)
        this.components.segment  = new Dimension("li", this.style.segment)
        this.components.progress = new Dimension("div", this.style.progress)

        this.Mute(this.property.scale)


        this.components.progress.Append(this.components.segment.Element)
        this.components.segment.Append(this.element)
        this.components.symbol.Append(this.element)

        this.components.symbol.Text(this.symbol)


    }


    public Symbol(value: string): void {

        this.components.symbol?.Text(value)

    }


    public Mute(scale: number): void {

        this.Scale(scale); this.Render()

    }


    private Scale(value: number): void {

        this.property.scale += value

    }


    private Render(): void {

        this.components.progress?.Mask({ [this.direction]: `${this.Porcent(this.property.scale)}%`})

    }


    public Porcent(scale: number): number {

        return this.rule(scale)

    }


    public Stop(): void {

        clearInterval(this.property.identity);

        this.property.identity = -1

        console.timeEnd()

    }


    public Animation(time: number): void {

        console.time()
        this.Reset()




        const duration  = time * 10 ** 3
        const interval  = 5
        const increment = 1 / (duration / interval)


        this.property.identity = setInterval(() => {

            this.Mute(increment)


            if(this.property.scale > 0 && this.property.scale < 1)
                return


            this.property.emit.callback(...this.property.emit.parameter)

            this.Stop()


        }, interval)

    }


    public Emit(callback: (parameter?: any) => any, ...parameter: any[]): void {

        this.property.emit = { callback, parameter }

    }


    public Reset(): void {

        this.Mask({ [this.direction]: this.property.size })

        this.property.scale = 0
        this.property.size  = this.element.style.height

    }


    public Descontruct(){ this.element.remove() }

}


type $Question = { question: string, answer: Record<string, string>, time: number, score: number, correct: number }


class Switch extends Dimension {

    private action: (state: boolean) => any = (state: boolean) => null

    public constructor(element: string, style: string | { [property: string]: string }, private state: boolean = false){ super(element, style )}

    public Swap(){ return this.state = !this.state }

    public Action(event: string, method: (state: boolean) => any){

        this.action = method

        this.Event(event, this.Method.bind(this))


    }

    public Method(event: any): any {

        if(!this.action)
            return

        return this.action(this.Swap())

    }

}


function Theme(theme: string | undefined | null ){

    if(!theme)
        return

    window.document.body.removeAttribute("class")

    window.document.body.setAttribute("class", theme)


}

async function Main(){


    Theme(window.localStorage.getItem("theme"))

    const Color = new Switch("div", "style-switch").Append(window.document.querySelector("body") as HTMLElement)

    Color.Text('<span class="material-symbols-outlined style-invert-color">invert_colors</span>')


    Color.Action("click", (state: boolean) => {

        const className = window.document.body.className.replace(/(style\-theme\-color\-dark|style\-theme\-color\-light)/g, '')

        const theme     = ( state ? "style-theme-color-dark" : "style-theme-color-light" ) + ' ' + className

        window.localStorage.setItem("theme", theme)

        Theme(theme)

    })


    const Database: $Question[] = await fetch("./Bank.json").then(response => response.json())

    const MaxScore = Database.reduce((max: number, current: $Question) => max + current.score, 0)




    const Hourglass   = (new Segment("height", (scale) => (1 - scale) * 100, '<span class="material-symbols-outlined">hourglass</span>', { symbol: "style-symbol", progress: "style-dust", segment: "style-gless", container: "style-hourglass" }))

    const Performance = (new Segment("height", (scale) => (scale * 100) / MaxScore , '<span class="material-symbols-outlined">check</span>', { symbol: "style-symbol", progress: "style-number", segment: "style-interval", container: "style-counter" }))



    const Quiz     = new Assessment("div", "style-content", new Question("h1", "style-question"), new Answer("ul", "style-answers"), new Bank(Database), new Score(0, MaxScore, Performance), Hourglass)


    Quiz.Append(window.document.querySelector(".style-assessment") as HTMLElement)

    Hourglass.Append(window.document.querySelector(".style-assessment") as HTMLElement)

    Performance.Append(window.document.querySelector(".style-assessment") as HTMLElement)


}

window.addEventListener("DOMContentLoaded", Main)


/*


    max - 100%
    part - x

    (100% * part) / max

    1    10
    x      2


    3.5 / 10 = x


    https://i.gifer.com/LT9D.gif
    https://i.makeagif.com/media/9-14-2016/-g-DoM.gif
    https://media3.giphy.com/media/dgQqdhCLb7UDm/200w.gif?cid=6c09b9524j6lrcwhaidd0sjbytiyoq89sikvdpmwii0i4fwz&ep=v1_gifs_search&rid=200w.gif&ct=g

*/