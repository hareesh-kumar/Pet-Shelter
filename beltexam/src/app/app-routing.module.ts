import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'pets', component: AppComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'new', component: NewComponent },
      { path: ':id', component: DetailsComponent },
      { path: ':id/edit', component: EditComponent },
      { path: '**', redirectTo: '/pets' }
    ]
  },
  { path: '**', redirectTo: '/pets' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
