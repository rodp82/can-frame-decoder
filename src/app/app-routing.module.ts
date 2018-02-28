import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoderComponent } from './decoder/decoder.component';

const routes: Routes = [{ path : 'decoder', component: DecoderComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
