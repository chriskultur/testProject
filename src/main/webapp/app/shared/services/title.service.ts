import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
import {PublicProductionService} from 'app/shared/services/public-production.service';
import {PublicWerkService} from 'app/shared/services/public-werk.service';
import {PublicSpielstatteService} from 'app/shared/services/public-spielstatte.service';
import {PublicBetriebService} from 'app/shared/services/public-betrieb.service';
import {PublicBenutzerService} from 'app/shared/services/public-benutzer.service';

@Injectable()
export class TitleService {
  default_title = 'eKulturPortal';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private publicProductionService: PublicProductionService,
    private publicWerkService: PublicWerkService,
    private publicSpielstatteService: PublicSpielstatteService,
    private publicBetriebService: PublicBetriebService,
    private publicBenutzerService: PublicBenutzerService,
    private meta: Meta
  ) {}

  boot() {
    this.router.events.pipe().subscribe(current_title => {
      let currentRoute = this.route.root;
      if (!this.router.url.includes('view')) {
        let title = '';
        do {
          const childrenRoutes = currentRoute.children;
          currentRoute = null;
          childrenRoutes.forEach(routes => {
            if (routes.outlet === 'primary') {
              title = routes.snapshot.data.breadcrumb;
              currentRoute = routes;
            }
          });
        } while (currentRoute);
        this.titleService.setTitle(title + ' - eKulturPortal ');
      }
    });
  }

  homePageTitleDescription() {
    this.titleService.setTitle('eKulturPortal - die digitale Lösung für die Kulturbranche');
    this.meta.updateTag({
      name: 'description',
      content:
        'Im eKulturPortal können Sie Ihr Netzwerk erweitern, spannende Produktionen, Werke und Spielstätten finden & buchen und Ihre Spielzeit planen & verwalten.',
    });
  }

  getProdInfo(id) {
    this.publicProductionService.getPublicProduction(id).subscribe(production => {
      this.publicBetriebService
        .getPublicBetrieb(production.produktionsrecheBetriebId == null ? production.betriebsId : production.produktionsrecheBetriebId)
        .subscribe(bet => {
          this.publicWerkService.getPublicProductionWerkForProduction(production.prodWerksId, production.id).subscribe(werk => {
            let temp =
              werk.titel + ' ist eine Produktion von ' + bet.betriebsname + '.' + ' Jetzt ansehen im eKulturPortal. Kostenlos mitmachen!';
            let description = '';
            if (temp.length > 160) {
              description = temp.slice(0, 157) + '...';
            } else {
              description = temp;
            }
            this.titleService.setTitle(werk.titel + ' - eKulturPortal ');
            this.meta.updateTag({
              name: 'description',
              content: description,
            });
          });
        });
    });
  }

  getWerkInfo(param) {
    this.publicWerkService.getPublicProductionWerk(param).subscribe(werk => {
      this.publicBetriebService
        .getPublicBetrieb(werk.vertriebBetriebId == null ? werk.betriebsId : werk.vertriebBetriebId)
        .subscribe(bet => {
          let temp = werk.titel + ' ist ein Werk von ' + bet.betriebsname + '.' + ' Jetzt ansehen im eKulturPortal. Kostenlos mitmachen!';
          let description = '';
          if (temp.length > 160) {
            description = temp.slice(0, 157) + '...';
          } else {
            description = temp;
          }
          this.titleService.setTitle(werk.titel + ' - eKulturPortal ');
          this.meta.updateTag({
            name: 'description',
            content: description,
          });
        });
    });
  }

  getSpielInfo(param) {
    this.publicSpielstatteService.getPublicSpielProd(param).subscribe(prodspiel => {
      this.publicSpielstatteService.getPublicSpiel(prodspiel.spielssId).subscribe(spiel => {
        this.publicBetriebService.getPublicBetrieb(spiel.betriebsId).subscribe(bet => {
          let temp =
            spiel.spielbezeichnung +
            '  ist eine Spielstätte von ' +
            bet.betriebsname +
            '.' +
            ' Jetzt ansehen im eKulturPortal. Kostenlos mitmachen!';
          let description = '';
          if (temp.length > 160) {
            description = temp.slice(0, 157) + '...';
          } else {
            description = temp;
          }
          this.titleService.setTitle(spiel.spielbezeichnung + ' - eKulturPortal ');
          this.meta.updateTag({
            name: 'description',
            content: description,
          });
        });
      });
    });
  }

  getBetInfo(param) {
    this.publicBetriebService.getPublicBetrieb(param).subscribe(bet => {
      let temp =
        bet.betriebsname +
        ' ist ' +
        (bet.betriebkatDTOList[0] != undefined ? bet.betriebkatDTOList[0].bezeichnung + ' ' : '') +
        (bet.betriebkatDTOList[1] != undefined ? ', ' + bet.betriebkatDTOList[1].bezeichnung : '') +
        '. Jetzt ansehen im eKulturPortal. Kostenlos mitmachen!';
      let description = '';
      if (temp.length > 160) {
        description = temp.slice(0, 157) + '...';
      } else {
        description = temp;
      }
      this.titleService.setTitle(bet.betriebsname + ' - eKulturPortal ');
      this.meta.updateTag({
        name: 'description',
        content: description,
      });
    });
  }

  getBenutzerInfo(param) {
    this.publicBenutzerService.getPublicBenutzerProfile(param).subscribe(bet => {
      this.titleService.setTitle(bet.vorname + ' ' + bet.nachname + ' - eKulturPortal ');
      let temp =
        bet.vorname +
        ' ' +
        bet.nachname +
        ' ist ein ' +
        (bet.bpBeruf[0] != undefined ? bet.bpBeruf[0].beruf + ' ' : '') +
        (bet.bpBeruf[1] != undefined ? ', ' + bet.bpBeruf[1].beruf : '') +
        '. Jetzt ansehen im eKulturPortal. Kostenlos mitmachen!';
      let description = '';
      if (temp.length > 160) {
        description = temp.slice(0, 157) + '...';
      } else {
        description = temp;
      }
      this.meta.updateTag({
        name: 'description',
        content: description,
      });
    });
  }

  getArtistInfo(param) {
    this.publicBetriebService.getPublicKunstlerProdukt({ betriebId: param }).subscribe(bet => {
      let temp;
      if (bet[0].kunstlername == null) {
        this.titleService.setTitle(bet[0].vorname + ' ' + bet[0].name + ' - eKulturPortal ');
        temp = bet[0].vorname + ' ' + bet[0].name + '. Jetzt ansehen im eKulturPortal. Kostenlos mitmachen!';
      } else {
        this.titleService.setTitle(bet[0].kunstlername + ' - eKulturPortal ');
        temp = bet[0].kunstlername + '. Jetzt ansehen im eKulturPortal. Kostenlos mitmachen!';
      }
      let description = '';
      if (temp.length > 160) {
        description = temp.slice(0, 157) + '...';
      } else {
        description = temp;
      }
      this.meta.updateTag({
        name: 'description',
        content: description,
      });
    });
  }
}
