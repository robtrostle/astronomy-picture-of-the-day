import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { PhotoByDateComponent } from './photo-by-date/photo-by-date.component';

const routes: Routes = [
  {path: 'contact', component: ContactComponent},
  {path: '', component: HomeComponent},
  {path: 'photo-by-date', component: PhotoByDateComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}//generic wilcard
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
