import { $Segment } from "../Type/Segment";
import { Dimension } from "./Dimension.js"


export class Segment extends Dimension implements $Segment {

    private property: { scale: number, size: string, identity: number, emit: { callback: (parameter?: any) => any, parameter: any }} = { scale: 0, size: '', identity: 0, emit: { callback: () => null , parameter: null}}

    private components: Record<"symbol" | "segment" | "progress", null | Dimension> = { symbol: null, segment: null , progress: null }

    public constructor(private direction: "width" | "height", private rule: (scale: number) => number, private symbol: string, private style: Record<"symbol" | "segment" | "progress" | "container", string | Record<string, string>>){ super("ul", style.container); this.Become() }

    private Become(): void {

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


    public Descontruct(){

        this.element.remove()

    }

}


