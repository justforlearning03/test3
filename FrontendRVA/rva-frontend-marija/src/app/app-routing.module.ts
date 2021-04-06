import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ObrazovanjeComponent } from './components/baza/obrazovanje/obrazovanje.component';
import { PreduzeceComponent } from './components/baza/preduzece/preduzece.component';
import { SektorComponent } from './components/baza/sektor/sektor.component';
import { RadnikComponent } from './components/baza/radnik/radnik.component';
import { HomeComponent } from './components/core/home/home.component';
import { AuthorComponent } from './components/core/author/author.component';
import { AboutComponent } from './components/core/about/about.component';

const Routes = [
  {path: 'radnik', component: RadnikComponent},
  {path: 'obrazovanje', component: ObrazovanjeComponent},
  {path: 'sektor', component: SektorComponent},
  {path: 'preduzece', component: PreduzeceComponent},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'author', component: AuthorComponent},
  {path: '', redirectTo: '/home', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(Routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
