import { Routes } from '@angular/router';
import { HomeComponent } from './components/main/home/home.component';
import { ImpressumComponent } from './components/main/impressum/impressum.component';
import { DatenschutzComponent } from './components/main/datenschutz/datenschutz.component';
import { ChronikComponent } from './components/main/chronik/chronik.component';
import { MitmachenComponent } from './components/main/mitmachen/mitmachen.component';
import { securityGuard } from './core/guards/security.guard';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent, 
    pathMatch: 'full',
    canActivate: [securityGuard]
  },
  { 
    path: 'impressum', 
    component: ImpressumComponent,
    canActivate: [securityGuard]
  },
  { 
    path: 'datenschutz', 
    component: DatenschutzComponent,
    canActivate: [securityGuard]
  },
  { 
    path: 'chronik', 
    component: ChronikComponent,
    canActivate: [securityGuard]
  },
  { 
    path: 'mitmachen', 
    component: MitmachenComponent,
    canActivate: [securityGuard]
  },
  // Wildcard route - redirect unknown routes to home
  { 
    path: '**', 
    redirectTo: '',
    pathMatch: 'full'
  }
];
