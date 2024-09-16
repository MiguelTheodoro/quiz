
import { $Dimension } from "./Dimension";


export interface $Question extends $Dimension {

    Content(value: string): void ;

    Deconstruct(): void;

}