import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoderComponent } from './decoder/decoder.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'decoder', component: DecoderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
