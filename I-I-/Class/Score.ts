
import { $Score } from "../Type/Score"
import { $Segment } from "../Type/Segment"


export class Score implements $Score {

    public constructor(private value: number, private max: number, private segment: $Segment){}


    public More(value: number): void {

        this.value += value

        this.segment.Mute(value)

    }


    public Zero(): void {

        this.value = 0

    }


    public get Max(): number {

        return this.max

    }


    public get Value(): number {

        return this.value

    }

}