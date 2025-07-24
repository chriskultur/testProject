import {Title} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import locale from '@angular/common/locales/de';
import {ServiceWorkerModule} from '@angular/service-worker';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {NgxWebstorageModule} from 'ngx-webstorage';
import dayjs from 'dayjs/esm';
import {NgbDateAdapter, NgbDatepickerConfig, NgbModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import { Pipe, PipeTransform } from '@angular/core';

import {ApplicationConfigService} from 'app/core/config/application-config.service';
import './config/dayjs';
import {SharedModule} from 'app/shared/shared.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {httpInterceptorProviders} from './core/interceptor';
import {AppComponent} from "./app.component";
import {HomepageModule} from "./pages/homepage/homepage.module";
import {RouterModule} from "@angular/router";
import {AuthComponent} from "./pages/auth/auth.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutes} from "./app.route";
import {AdminComponent} from "./pages/admin/admin.component";
import {GlobalVariableService} from "./shared/global-variable/globalVariable.service";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {FormsModule} from "@angular/forms";
import {NgxTextDiffModule} from "@stelmukhov/ngx-text-diff";


@NgModule({
  imports: [
    BrowserAnimationsModule,
    NgbModule,
    NgbTooltipModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    // Set this to true to enable service worker (PWA)
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
    HttpClientModule,
    NgxTextDiffModule,
    NgxWebstorageModule.forRoot({ prefix: 'app', separator: '-', caseSensitive: true }),
    PdfViewerModule,
    SharedModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes, { onSameUrlNavigation: 'reload' })
  ],
  providers: [
    Title,
    GlobalVariableService,
    { provide: LOCALE_ID, useValue: 'de' },
    httpInterceptorProviders,
  ],
  declarations: [AppComponent,AuthComponent,AdminComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(applicationConfigService: ApplicationConfigService, iconLibrary: FaIconLibrary, dpConfig: NgbDatepickerConfig) {
    applicationConfigService.setEndpointPrefix(SERVER_API_URL);
    registerLocaleData(locale);
    iconLibrary.addIcons(...fontAwesomeIcons);
    dpConfig.minDate = { year: dayjs().subtract(100, 'year').year(), month: 1, day: 1 };
  }
}

