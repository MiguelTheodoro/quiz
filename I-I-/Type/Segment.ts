
import { $Dimension } from "./Dimension";


export interface $Segment extends $Dimension {

    Symbol(value: string): void;

    Mute(scale: number): void;

    Porcent(scale: number): number;

    Stop(): void;

    Animation(time: number): void ;

    Emit(callback: (parameter?: any) => any, ...parameter: any[]): void ;

    Reset(): void;

    Descontruct(): void ;

}