import {Component} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
  breadcrumbs: Array<any>;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.loadBreadcrumbs();
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.loadBreadcrumbs();
    });
  }

  loadBreadcrumbs() {
    this.breadcrumbs = [];
    let currentRoute = this.route.root,
      url = '';
    do {
      const childrenRoutes = currentRoute.children;
      currentRoute = null;
      let tempBreadcrumb: string;
      childrenRoutes.forEach(routes => {
        console.log("myroutes: {}",routes.queryParams);
        if (routes.outlet === 'primary') {
          const routeSnapshot = routes.snapshot;
          console.log("snapshot: {}",routeSnapshot);
          console.log("query: {}",routeSnapshot.queryParams.hasOwnProperty('vertragArt'));
          url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
          if (routes.snapshot.data.breadcrumb !== undefined) {
            let status = true;
            if (routes.snapshot.data.status !== undefined) {
              status = routes.snapshot.data.status;
            }

            let icon = false;
            if (routes.snapshot.data.icon !== undefined) {
              icon = routes.snapshot.data.icon;
            }

            let text = false;
            if (routes.snapshot.data.text !== undefined) {
              text = routes.snapshot.data.text;
            }
            if (tempBreadcrumb !== routes.snapshot.data.breadcrumb) {
              let image = '../../../content/images/Logo_IGPlus.png';
              console.log();
              this.breadcrumbs.push({
                label: routes.snapshot.data.breadcrumb,
                icon: icon,
                status: status,
                text: text,
                url: url,
                image: routeSnapshot.queryParams.hasOwnProperty('vertragArt')? image: null,
              });
            }
            tempBreadcrumb = routes.snapshot.data.breadcrumb;
          }
          currentRoute = routes;
        }
      });
    } while (currentRoute);
  }
}
