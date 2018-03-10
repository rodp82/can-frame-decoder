import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DecoderComponent } from './decoder/decoder.component';

import { DecoderService } from './services/decoder.service';


@NgModule({
  declarations: [
    AppComponent,
    DecoderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [ DecoderService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
