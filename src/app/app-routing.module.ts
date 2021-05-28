import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacotimoComponent } from './pages/pacotimo/pacotimo.component';

const routes: Routes = [
  { path: 'home', component: PacotimoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
