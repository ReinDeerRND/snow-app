import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { CardRegime, IWord } from 'src/app/model/model';
import { LoadDictService } from 'src/app/services/load-dict.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  dictionary: IWord[] = [];
  words: IWord[] = [];
  pageSize = 30;
  page = 0;
  pageAmount: number = 0;
  iterator = 0;
  currentCard: IWord | null = null;
  isDictionaryFinished = false;
  isWordChecked = false;
  regimeControl = new FormControl<CardRegime>(CardRegime.Foreign);
  regimeSub: Subscription | undefined;
  regime: CardRegime = CardRegime.Foreign;

  constructor(private service: LoadDictService) {}

  ngOnInit(): void {
    this.dictionary = this.service.getSessionDictionary();
    this.pageAmount = Math.ceil(this.dictionary.length / this.pageSize);
    this.getNextPage();
    this.regimeSub = this.regimeControl.valueChanges.subscribe((regime) => {
      if (regime) {
        this.regime = regime;
      }
    });
  }

  check() {
    this.isWordChecked = true;
  }

  getNextPage() {
    if (this.page < this.pageAmount) {
      this.words = _.shuffle(
        this.dictionary.slice(
          this.page * this.pageSize,
          (this.page + 1) * this.pageSize
        )
      );
      this.nextCard();
      this.page++;
    } else {
      this.isDictionaryFinished = true;
    }
  }

  nextCard() {
    if (this.iterator > this.words.length - 1) {
      this.iterator = 0;
      this.getNextPage();
    } else {
      this.isWordChecked = false;
      let word = this.words[this.iterator];
      switch (this.regime) {
        case CardRegime.Foreign:
          this.chooseWord(true, word);
          break;
        case CardRegime.Translate:
          this.chooseWord(false, word);
          break;
        case CardRegime.Both:
        default:
          this.chooseWord(!!Math.round(Math.random()), word);
          break;
      }
      this.iterator++;
    }
  }

  chooseWord(isEnglish: boolean, word: IWord) {
    if (isEnglish) {
      this.currentCard = word;
    } else {
      this.currentCard = {
        key: word.translate,
        translate: word.key,
      };
    }
  }

  reload() {
    this.page = 0;
    this.iterator = 0;
    this.getNextPage();
    this.isDictionaryFinished = false;
  }

  goToDictionary() {}
}
