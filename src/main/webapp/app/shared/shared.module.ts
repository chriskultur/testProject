import {NgModule, Pipe, PipeTransform} from '@angular/core';

import {SharedLibsModule} from './shared-libs.module';
import {AlertComponent} from './alert/alert.component';
import {AlertErrorComponent} from './alert/alert-error.component';
import {HasAnyAuthorityDirective} from './auth/has-any-authority.directive';
import {DurationPipe} from './date/duration.pipe';
import {FormatMediumDatetimePipe} from './date/format-medium-datetime.pipe';
import {FormatMediumDatePipe} from './date/format-medium-date.pipe';
import {SortByDirective} from './sort/sort-by.directive';
import {SortDirective} from './sort/sort.directive';
import {ItemCountComponent} from './pagination/item-count.component';
import {FilterComponent} from './filter/filter.component';
import {AgbtermsComponent} from "./child_components/organisation/agbterms/agbterms.component";
import {DataprivacyComponent} from "./child_components/organisation/dataprivacy/dataprivacy.component";
import {ImpressumComponent} from "./child_components/organisation/impressum/impressum.component";
import {GlobalSearchComponent} from "./child_components/globalSearch/globalSearch.component";
import {RouterLink, RouterModule} from "@angular/router";
import {ToastComponent} from "./child_components/toast/toast.component";
import {SpinnerOverlayComponent} from "./child_components/spinner-overlay/spinner-overlay.component";
import {SpinnerComponent} from "./child_components/spinner/spinner.component";
import {EmailTemplateService} from "./services/emailTemplate.service";
import {ElasticsearchService} from "./services/elasticsearch.service";
import {AuthGuard} from "./validation/auth-guard";
import {AdminGuard} from "./validation/admin-gurad";
import {HomepageGuard} from "./validation/homepage-guard";
import {MailService} from "./services/mail.service";
import {BetriebService} from "./services/betrieb.service";
import {BpBetVerknupfungService} from "./services/bpBetVerknupfung.service";
import {BpBetService} from "./services/bpBet.service";
import {AdresseService} from "./services/adresse.service";
import {RechtformService} from "./services/rechtform.service";
import {LilandService_bp} from "./services/liland-bp.service";
import {MitarbeiterService} from "./services/mitarbeiter.service";
import {VertriebEinkaufService} from "./services/vertriebEinkauf.service";
import {GlobalSearchService} from "./services/globalSearch.service";
import {ProdMediaService} from "./services/production-media.service";
import {BetribeSecurityService} from "./services/betribeSecurity.service";
import {WerkService} from "./services/werk.service";
import {StageService} from "./services/stage.service";
import {NotificationService} from "./services/notification.service";
import {MitarbeiterBilderService} from "./services/mitarbeiter_bilder.service";
import {CanDeactivateGuard} from "./validation/unsaved-changes-warning-guard";
import {BpSucheService} from "./services/bpSuche.service";
import {ProductgroupService} from "./services/productgroup.service";
import {WINDOW_PROVIDERS} from "./services/window.service";
import {CalendarService} from "./services/calendar.service";
import {TitleService} from "./services/title.service";
import {GlobalErrorHandler} from "./util/globlaErrorHandler";
import {BuchungService} from "./services/buchung.service";
import {Browser_version_checkService} from "./services/browser_version_check.service";
import {FavoritService} from "./services/favorit_service";
import {PublicCalendarService} from "./services/public-calendar.service";
import {PublicContractService} from "./services/public-contract.service";
import {OpenPdfIntoNewTabWithBase64StringService} from "./services/openPdfIntoNewTabWithBase64String.service";
import {KunstlerService} from "./services/kunstler.service";
import {prodHTTPService} from "./services/production.business-logic.service";
import {BpService} from "./services/bp.service";
import {PublicProductionService} from "./services/public-production.service";
import {PublicWerkService} from "./services/public-werk.service";
import {PublicSpielstatteService} from "./services/public-spielstatte.service";
import {PublicBetriebService} from "./services/public-betrieb.service";
import {InterestMailService} from "./services/interestMail.service";
import {PublicBenutzerService} from "./services/public-benutzer.service";
import {verlaglistService} from "./services/verlaglist.service";
import {ContractService} from "./services/contract.service";
import {NotificationComponent} from "./child_components/notification/notification.component";
import {FeedbackComponent} from "./child_components/feedback/feedback.component";
import {SubscriptionNotiz} from "./subscriptions/supscription.notiz";
import {CreateCompanyComponent} from "./child_components/create-company/create-company.component";
import {
  SearchBetriebeElasticComponent
} from "./child_components/search-betriebe-elastic/search-betriebe-elastic.component";
import {BreadcrumbsComponent} from "./breadcrumbs/breadcrumbs.component";
import {ImageUploadComponent} from "./child_components/image-upload/image-upload.component";
import {ImageCropperModule} from "ngx-image-cropper";
import {CardComponent} from "./child_components/card/card.component";
import {FavoriteComponent} from "./child_components/favorite/favorite.component";
import {ShowOnlyUnusedTagSuggestionsFilter} from "./pipe/show-only-unused-tag-suggestions";
import {QuillEditComponent} from "./child_components/quill-edit/quill-edit.component";
import {QuillModule} from "ngx-quill";
import {
  ProductMediaDocumentComponent
} from "./child_components/product-media-document/product-media-document.component";
import {ProductMediaVideoComponent} from "./child_components/product-media-video/product-media-video.component";
import {ProductMediaComponent} from "./child_components/product-media/product-media.component";
import {
  InvitePersonMitarbeiterComponent
} from "./child_components/invite-person-miarbeiter/invite-person-mitarbeiter.component";
import {NgxGalleryModule} from "@hyahfoufi/ngx-gallery";
import {MessageTemplateComponent} from "./child_components/message-template/message-template.component";
import {SharedImagesComponent} from "./child_components/shared-images/shared-images.component";
import {SafePipe} from "./pipe/unsafeUrlToSafe";
import {CreateInviteCompanyComponent} from "./child_components/create-invite-company/create-invite-company.component";
import {ProductMediaViewComponent} from "./child_components/product-media-view/product-media-view.component";
import {EditMitwirkendeComponent} from "./child_components/edit-mitwirkende/edit-mitwirkende.component";
import {CreateMitwirkendeComponent} from "./child_components/create-mitwirkende/create-mitwirkende.component";
import {InvitePersonAllTypeComponent} from "./child_components/invite-person-AllType/invite-person-AllType.component";
import {TagInputModule} from "ngx-chips";
import {AutoCompleteModule} from "@syncfusion/ej2-angular-dropdowns";
import {CreateSpielComponent} from "./child_components/create-spiel/create-spiel.component";
import {MediaGalleryComponent} from "./child_components/media-gallery/media-gallery.component";
import {MediaVideoComponent} from "./child_components/media-video/media-video.component";
import {PersonlicheNachrichtComponent} from "./child_components/personliche-nachricht/personliche-nachricht.component";
import {
  SearchProductionElasticComponent
} from "./child_components/search-production-elastic/search-production-elastic.component";
import {QuillEditContractComponent} from "./child_components/quill-edit-contract/quill-edit-contract.component";
import {ProductMediaMp3Component} from "./child_components/product-media-mp3/product-media-mp3.component";
import {ProductMediaMp3ViewComponent} from "./child_components/product-media-mp3-view/product-media-mp3-view.component";
import {OltUiSwitchModule} from "@outerlimitstech/ngx-ui-switch";
import {ContractTableComponent} from "../pages/contract-table/contract-table.component";
import {TabContainerComponent} from "../pages/tab-container/tab-container.component";

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number, trail = '...'): string {
    if (value.length <= limit) {
      return value;
    }

    return value.substring(0, limit - trail.length).replace(/\s+$/, '') + trail;
  }
}

@NgModule({
  imports: [
    ImageCropperModule,
    SharedLibsModule,
    RouterLink,
    NgxGalleryModule,
    QuillModule.forRoot({
      theme: 'snow',
      placeholder: 'Beschreibung',
      modules: {
        syntax: false,
        toolbar: [
          ['bold', 'italic', 'underline'], // toggled buttons
        ],
      },
    }),
    RouterModule,
    TagInputModule,
    AutoCompleteModule,
    OltUiSwitchModule.forRoot({
      size: 'small',
      color: 'rgb(0, 189, 99)',
      switchColor: '#80FFA2',
      defaultBgColor: '#00ACFF',
      defaultBoColor: '#476EFF',
      checkedLabel: 'on',
      uncheckedLabel: 'off'
    })
  ],
  declarations: [
    ContractTableComponent,
    TabContainerComponent,
    ProductMediaComponent,
    SharedImagesComponent,
    MessageTemplateComponent,
    ProductMediaVideoComponent,
    ProductMediaDocumentComponent,
    CardComponent,
    FeedbackComponent,
    NotificationComponent,
    SpinnerComponent,
    SpinnerOverlayComponent,
    ToastComponent,
    SafePipe,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    SortByDirective,
    SortDirective,
    ItemCountComponent,
    FilterComponent,
    TruncatePipe,
    AgbtermsComponent,
    DataprivacyComponent,
    ImpressumComponent,
    GlobalSearchComponent,
    CreateCompanyComponent,
    SearchBetriebeElasticComponent,
    BreadcrumbsComponent,
    ImageUploadComponent,
    FavoriteComponent,
    ShowOnlyUnusedTagSuggestionsFilter,
    QuillEditComponent,
    ProductMediaComponent,
    InvitePersonMitarbeiterComponent,
    CreateInviteCompanyComponent,
    ProductMediaViewComponent,
    EditMitwirkendeComponent,
    CreateMitwirkendeComponent,
    InvitePersonAllTypeComponent,
    CreateSpielComponent,
    MediaGalleryComponent,
    MediaVideoComponent,
    MessageTemplateComponent,
    PersonlicheNachrichtComponent,
    QuillEditContractComponent,
    SearchProductionElasticComponent,
    ProductMediaMp3Component,
    ProductMediaMp3ViewComponent
  ],
  exports: [
    TabContainerComponent,
    ContractTableComponent,
    ProductMediaMp3ViewComponent,
    ProductMediaMp3Component,
    MediaGalleryComponent,
    MediaVideoComponent,
    MessageTemplateComponent,
    PersonlicheNachrichtComponent,
    QuillEditContractComponent,
    SearchProductionElasticComponent,
    CreateSpielComponent,
    OltUiSwitchModule,
    TruncatePipe,
    InvitePersonAllTypeComponent,
    EditMitwirkendeComponent,
    CreateMitwirkendeComponent,
    ProductMediaViewComponent,
    CreateInviteCompanyComponent,
    SharedImagesComponent,
    MessageTemplateComponent,
    ProductMediaVideoComponent,
    ProductMediaComponent,
    InvitePersonMitarbeiterComponent,
    ProductMediaDocumentComponent,
    QuillEditComponent,
    ShowOnlyUnusedTagSuggestionsFilter,
    CardComponent,
    FavoriteComponent,
    ImageUploadComponent,
    BreadcrumbsComponent,
    SearchBetriebeElasticComponent,
    CreateCompanyComponent,
    FeedbackComponent,
    NotificationComponent,
    SharedLibsModule,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    SortByDirective,
    SortDirective,
    ItemCountComponent,
    FilterComponent,
    AgbtermsComponent,
    DataprivacyComponent,
    ImpressumComponent,
    GlobalSearchComponent,
    SpinnerComponent,
    SpinnerOverlayComponent,
    ToastComponent,
  ],
  providers: [
    SubscriptionNotiz,
    FeedbackComponent,
    EmailTemplateService,
    ElasticsearchService,
    AuthGuard,
    AdminGuard,
    HomepageGuard,
    MailService,
    BetriebService,
    BpBetVerknupfungService,
    BpBetService,
    AdresseService,
    RechtformService,
    LilandService_bp,
    MitarbeiterService,
    GlobalSearchService,
    ProdMediaService,
    BetribeSecurityService,
    WerkService,
    StageService,
    NotificationService,
    MitarbeiterBilderService,
    CanDeactivateGuard,
    BpSucheService,
    ProductgroupService,
    WINDOW_PROVIDERS,
    CalendarService,
    TitleService,
    GlobalErrorHandler,
    BuchungService,
    Browser_version_checkService,
    FavoritService,
    VertriebEinkaufService,
    PublicCalendarService,
    PublicContractService,
    OpenPdfIntoNewTabWithBase64StringService,
    KunstlerService,
    prodHTTPService,
    BpService,
    PublicProductionService,
    PublicWerkService,
    PublicSpielstatteService,
    PublicBetriebService,
    TitleService,
    PublicProductionService,
    InterestMailService,
    PublicBenutzerService,
    verlaglistService,
    ContractService,
  ]
})
export class SharedModule {}
