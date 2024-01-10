import { IWord } from "../model/model";

export const sortWords = (a: IWord, b: IWord) => a.key > b.key ? 1 : -1