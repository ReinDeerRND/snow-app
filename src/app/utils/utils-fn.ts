import { IWord } from "../model/model";

export const sortWords = (a: IWord, b: IWord) => a.key.toLowerCase() > b.key.toLowerCase() ? 1 : -1