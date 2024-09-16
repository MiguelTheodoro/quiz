
import { $Part } from "./Part";


export interface $Assessment {

    View(entity: "question" | "answer", target: string): void ;

    Rate(part: $Part): void ;

    Result(state: -1 | 0 |  1): void ;

    Overflow(): void ;

    Next(): void;

}