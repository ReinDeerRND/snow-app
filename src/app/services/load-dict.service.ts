import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseDictionary, DBDictionary, SessionDictionary } from '../data/base-dict';
import { IText, IWord } from '../model/model';
import { Subject } from 'rxjs';
import { BaseTexts } from '../data/base-text';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class LoadDictService {

  private dbUrl = 'api/dict';
  changeDictionary: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {
    // let sub = this.loadDictionaryFromDB().subscribe(dict => {
    //   dict.forEach(item => SessionDictionary.push(item));
    //   sub.unsubscribe();
    // });
  }

  isWordExist(key: string): boolean{
   return _.find(SessionDictionary, { key: key })? true: false;
  }
  
  addWordToDictionary(word: IWord) {
    if (!this.isWordExist(word.key) ) { 
      SessionDictionary.push(word); 
      this.changeDictionary.next(true);
    }
  }

  deleteWordFromDictionary(key: string){
    let index  = _.findIndex(SessionDictionary, { key: key });
    SessionDictionary.splice(index, 1);
  }

  getWord(key: string): IWord | null{
    let word = _.find(SessionDictionary, { key: key })
    return word? word : null;
  }

  editWordInDictionary(word: IWord){
    SessionDictionary.forEach((item:IWord)=>{
      if(item.key === word.key) item.translate = word.translate;
    })    
    this.changeDictionary.next(true);
  }

  addWordsToDictionary(array: IWord[]) {
    if (array && array.length > 0) {
      array.forEach(item => {
        if(item.key) {
          this.addWordToDictionary(item);
        }
      });
    }
  }

  getSessionDictionary() {
    return SessionDictionary.sort((a: IWord, b: IWord) => a.key > b.key ? 1 : -1);
  }

  saveSessionDictionaryToDB() {
    SessionDictionary.forEach((word: IWord) => {
      DBDictionary.push(word);
    })
  }

  // loadDictionaryFromDB() { //remote dict in DB
  //   return this.http.get<IWord[]>(this.dbUrl);
  // }

  loadTexts() {
    return BaseTexts;
  }

  addText(text: IText) {
    BaseTexts.unshift(text);
  }

  loadBaseDictionary() {
    BaseDictionary.forEach((word: IWord) => {
      if (!_.find(SessionDictionary, { key: word.key })) { 
        SessionDictionary.push(word); 
      }
    });
    this.changeDictionary.next(true);
  }
}
