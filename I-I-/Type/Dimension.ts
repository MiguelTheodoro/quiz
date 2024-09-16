
export interface $Dimension {

    Event(type: string, callback: EventListenerOrEventListenerObject, remove: boolean): void;

    get Element(): HTMLElement;

    Text(value: string): void;

    Append(father: HTMLElement): void;

    Mask(style: { [property: string]: string }): void;

    Mark(property: string, value: string): void;
    
    Aesthetic(style: string | { [property: string]: string }): void;

}