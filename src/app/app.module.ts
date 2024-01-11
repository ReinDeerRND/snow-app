import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TextsComponent } from './components/texts/texts.component';
import { LoadComponent } from './components/load/load.component';
import { DictComponent } from './components/dict/dict.component';
// import { DbService } from './services/db.service';
import { CommonModule } from '@angular/common';
import { SearchWordPipe } from './search-word.pipe';
import { ModalNewWordComponent } from './components/modal-new-word/modal-new-word.component';
import { ModalEditWordComponent } from './components/modal-edit-word/modal-edit-word.component';
import { ModalInfoComponent } from './components/modal-info/modal-info.component';
import { ModalFileAddComponent } from './components/modal-file-add/modal-file-add.component';
import { CardsComponent } from './components/cards/cards.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    TextsComponent,
    LoadComponent,
    DictComponent,
    SearchWordPipe,
    ModalNewWordComponent,
    ModalEditWordComponent,
    ModalInfoComponent,
    ModalFileAddComponent,
    CardsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
