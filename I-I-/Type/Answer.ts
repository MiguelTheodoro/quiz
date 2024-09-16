
import { $Assessment } from "./Assessment";
import { $Dimension } from "./Dimension";
import { $Part } from "./Part";


export interface $Answer extends $Dimension {

    Content(value: Record<string, string>): void;

    Bind(assessment: $Assessment): void;

    Break(assessment: $Assessment): void;

    Part(identity: number): $Part;

    Deconstruct(): void;

    AutoDeconstruct(): void;

}