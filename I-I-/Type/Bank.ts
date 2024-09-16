
export interface $Bank {

    Present():  IteratorResult<{ value: any, done: boolean }>;

    Next(): IteratorResult<{ value: any, done: boolean }>;

}