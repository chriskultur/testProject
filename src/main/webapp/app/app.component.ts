import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AccountService} from 'app/core/auth/account.service';
import {ToastService} from 'app/shared/services/toast.service';
import {LoginService} from 'app/login/login.service';
import {TitleService} from 'app/shared/services/title.service';
import {MetatagsService} from "./shared/services/metatags.service";
import {ActivatedRoute} from "@angular/router";
import {PublicProductionService} from "./shared/services/public-production.service";
import {ProdMediaService} from "./shared/services/production-media.service";
import {PublicWerkService} from "./shared/services/public-werk.service";

@Component({
  selector: 'app-root',
  template: '<router-outlet><app-spinner></app-spinner></router-outlet>' + '<app-toasts></app-toasts>',
  styleUrls: [
    '../../../../node_modules/bootstrap/scss/bootstrap.scss',
    '../content/icon/icofont/css/icofont.min.scss',
    'styles.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'app';
  position = 'bottom-right';
  bp: any;

  constructor(
    private principal: AccountService,
    private toastService: ToastService,
    private loginService: LoginService,
    private titleService: TitleService,
    private metaService : MetatagsService,
    private route: ActivatedRoute,
    public publicProductionService: PublicProductionService,
    public mediaService: ProdMediaService,
    public publicWerkService: PublicWerkService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.publicProductionService.getPublicProduction(params['pID']).subscribe(production => {
        this.publicWerkService.getPublicProductionWerkForProduction(production.prodWerksId, production.id).subscribe(werk => {
          this.publicProductionService.getPublicProductionMediaMinimal(params['pID']).subscribe(productionMedia => {
            let picture = '';
            if(productionMedia.filter(gallery => gallery.mediatypCode == 1 && gallery.reihenfolge == 0).length!=0){
              let pic = productionMedia.filter(gallery => gallery.mediatypCode == 1 && gallery.reihenfolge == 0)[0];
              picture = 'data:' + pic.mediaContentType + ';base64,' + pic.media;
            }
            this.metaService.updateSeoTags(werk.titel,production.beschreibung,picture);
          });
        });
      });
    });

    this.principal.identity().subscribe(account => {
      this.bp = account;
      // if (account != null) {
      //   //Start watching for user inactivity.
      //   this.userIdle.startWatching();
      //
      //   // Start watching when user idle is starting.
      //   this.userIdle.onTimerStart().subscribe();
      //
      //   // Start watch when time is up.
      //   this.userIdle.onTimeout().subscribe(() => {
      //     this.userIdle.stopWatching();
      //     this.userIdle.stopTimer();
      //     this.loginService.logout();
      //   });
      // }
    });
  }

  showSuccess(options: any) {
    this.toastService.show(options.msg, {
      classname: 'bg-success',
      delay: options.timeout,
      autohide: true,
      headertext: options.title,
    });
  }
}
