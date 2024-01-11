export interface IWord {
    key: string, 
    translate: string
}
export interface IText{
    textTitle: string,
    textContent: string
}

export enum CardRegime {
    Foreign = "Foreign",
    Translate = "Translate",
    Both = "Both"
}