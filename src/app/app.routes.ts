import { Routes } from '@angular/router';
import { HomeComponent } from './components/main/home/home.component';
import { ImpressumComponent } from './components/main/impressum/impressum.component';
import { DatenschutzComponent } from './components/main/datenschutz/datenschutz.component';
import { ChronikComponent } from './components/main/chronik/chronik.component';
import { MitmachenComponent } from './components/main/mitmachen/mitmachen.component';
import { MedienComponent } from './components/main/medien/medien.component';
import { AufstellungComponent } from './components/main/aufstellung/aufstellung.component';
import { securityGuard } from './core/guards/security.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Tactical Training Team',
        pathMatch: 'full',
        canActivate: [securityGuard],
    },
    {
        path: 'impressum',
        component: ImpressumComponent,
        title: 'Impressum - Tactical Training Team',
        canActivate: [securityGuard],
    },
    {
        path: 'datenschutz',
        component: DatenschutzComponent,
        title: 'Datenschutz - Tactical Training Team',
        canActivate: [securityGuard],
    },
    {
        path: 'chronik',
        component: ChronikComponent,
        title: 'Chronik - Tactical Training Team',
        canActivate: [securityGuard],
    },
    {
        path: 'mitmachen',
        component: MitmachenComponent,
        title: 'Mitmachen - Tactical Training Team',
        canActivate: [securityGuard],
    },
    {
        path: 'medien',
        component: MedienComponent,
        title: 'Medien - Tactical Training Team',
        canActivate: [securityGuard],
    },
    {
        path: 'aufstellung',
        component: AufstellungComponent,
        title: 'Aufstellung - Tactical Training Team',
        canActivate: [securityGuard],
    },
    // Wildcard route - redirect unknown routes to home
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
