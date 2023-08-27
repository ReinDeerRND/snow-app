import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { IText } from 'src/app/model/model';
import { LoadDictService } from 'src/app/services/load-dict.service';

@Component({
  selector: 'app-texts',
  templateUrl: './texts.component.html',
  styleUrls: ['./texts.component.scss']
})
export class TextsComponent implements OnInit, AfterViewInit{
  texts: IText[] = [];
  panelOpenState: boolean[] = [];
  @ViewChildren (MatAccordion) accordeons!: QueryList<MatAccordion> ;
  accordeonArray: MatAccordion[] =[];

  constructor(private service: LoadDictService) { 
  }
  ngAfterViewInit(): void {
    this.accordeonArray = this.accordeons.toArray();   
  }

  ngOnInit(): void { 
    this.texts = this.service.loadTexts();
    this.texts.forEach(()=>this.panelOpenState.push(false));
  }
  collapse(){
    this.accordeonArray.forEach(acc=>acc.closeAll());
  }
  expand(){
    this.accordeonArray.forEach(acc=>acc.openAll());
  }
}
