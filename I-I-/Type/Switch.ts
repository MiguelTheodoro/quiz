
import { $Dimension } from "./Dimension";


export interface $Switch extends $Dimension {

    Swap(): void;

    Action(event: string, method: (state: boolean) => any): void;

    Method(event: any): any;

}



