import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CanFrameDecoderComponent } from './can-frame-decoder/can-frame-decoder.component';


@NgModule({
  declarations: [
    AppComponent,
    CanFrameDecoderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
