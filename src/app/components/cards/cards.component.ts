import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { IWord } from 'src/app/model/model';
import { LoadDictService } from 'src/app/services/load-dict.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  dictionary: IWord[] = [];
  words: IWord[] = [];
  pageSize = 10;
  page = 0;
  pageAmount: number = 0;
  iterator = 0;
  currentCard: IWord | null = null;
  isDictionaryFinished = false;

  constructor(private service: LoadDictService) {}

  ngOnInit(): void {
    this.dictionary = this.service.getSessionDictionary();
    this.pageAmount = Math.ceil(this.dictionary.length / this.pageSize);
    this.getNextPage();
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
      this.currentCard = this.words[this.iterator];
      this.iterator++;
    }
  }

  reload() {
    this.page = 0;
    this.iterator = 0;
    this.getNextPage();
    this.isDictionaryFinished = false;
  }
}
