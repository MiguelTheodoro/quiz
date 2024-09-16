
import { $Dimension } from "./Dimension";


export interface $Part extends $Dimension {

    get Identity(): string;

    get Content(): string;

    State(value: -1 | 0 | 1): void

    Empty(): void;

    Correct(): void;

    Incorrect(): void;

    Deconstruct(): void;

}