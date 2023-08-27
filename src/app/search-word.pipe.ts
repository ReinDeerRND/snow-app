import { Pipe, PipeTransform } from '@angular/core';
import { IWord } from './model/model';

@Pipe({
  name: 'searchWord',
  pure: false
})
export class SearchWordPipe implements PipeTransform {

  transform(value: IWord[], search: string): IWord[] {
    if(search && search!==""){
      let array: IWord[] = value.filter((word:IWord)=> word.key.toLowerCase().includes(search.toLowerCase()))
    return array;
    } else {
      return value;
    }
  }

}
