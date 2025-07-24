import { ActivatedRoute, Router, Routes } from '@angular/router';
import {AdminComponent} from 'app/pages/admin/admin.component';
import { HomepageGuard } from './shared/validation/homepage-guard';


export const AppRoutes: Routes = [
  {
    // path: '',
    // component: AdminComponent,
    // // canActivate: [HomepageGuard],
    // // canLoad: [AuthGuard],
    path: '' ,
    component:  AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'homepage',
        pathMatch: 'full',
      },
      {
        path: 'homepage',
        loadChildren: () => import('./pages/homepage/homepage.module').then(mod => mod.HomepageModule),
      },
    ],
  }
];
