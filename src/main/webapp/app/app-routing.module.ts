import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {DEBUG_INFO_ENABLED} from 'app/app.constants';
import {Authority} from 'app/config/authority.constants';

import {UserRouteAccessService} from 'app/core/auth/user-route-access.service';

// noinspection AngularInvalidImportedOrDeclaredSymbol
@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule),
        },
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
