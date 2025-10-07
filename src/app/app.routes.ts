import { Routes } from '@angular/router';
import { HomeComponent } from './components/main/home/home.component';
import { ImpressumComponent } from './components/main/impressum/impressum.component';
import { DatenschutzComponent } from './components/main/datenschutz/datenschutz.component';
import { ChronikComponent } from './components/main/chronik/chronik.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'datenschutz', component: DatenschutzComponent },
  { path: 'chronik', component: ChronikComponent }
];
