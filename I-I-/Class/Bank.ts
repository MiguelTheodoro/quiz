
import { $Bank } from "../Type/Bank"

import { $BankQuestion } from "../Type/BankQuestion"


export class Bank implements $Bank {

    public constructor(private value: $BankQuestion[], private present?: any, private interator?: Generator){

        this.interator = this.Generator()

    }


    private* Generator(){

        for(const content of this.value) yield content

    }


    public Present(){

        return this.present

    }


    public Next(): IteratorResult<{ value: any, done: boolean } > {

        return this.present = this.interator?.next() as { value: any, done: boolean }

    }

}