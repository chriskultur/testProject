import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {animate, AUTO_STYLE, state, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ModalDismissReasons, NgbCarouselConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GlobalSearchService} from '../../shared/services/globalSearch.service';
import { ekp_kb, ekp_Version, SERVER_UNDER_CONSTRUCTION } from 'app/app.constants';
import {Liland} from 'app/shared/models/liland.model';
import {Betrieb, Betriebebild} from 'app/shared/models/betrieb.model';
import {filter} from 'rxjs/operators';
import {Listerform} from 'app/shared/models/listerform.model';
import {BpService} from 'app/shared/services/bp.service';
import {Bp, BpImage} from 'app/shared/models/bp.model';
import {LoginService} from 'app/login/login.service';
import {WerkService} from 'app/shared/services/werk.service';
import {AccountService} from 'app/core/auth/account.service';
import {StageService} from 'app/shared/services/stage.service';
import {BetriebSecurityModel} from 'app/shared/models/betriebSecurity.model';
import {BetribeSecurityService} from 'app/shared/services/betribeSecurity.service';
import {Account} from 'app/core/auth/account.model';
import {DashboardModel} from 'app/shared/models/dashboard.model';
import {BpBetVerknupfung} from 'app/shared/models/bpBetVerknupfung.model';
import {BpBetService} from 'app/shared/services/bpBet.service';
import {BpBetVerknupfungService} from 'app/shared/services/bpBetVerknupfung.service';
import {prodHTTPService} from 'app/shared/services/production.business-logic.service';
import {AdresseService} from 'app/shared/services/adresse.service';
import {MitarbeiterService} from 'app/shared/services/mitarbeiter.service';
import {LilandService_bp} from 'app/shared/services/liland-bp.service';
import {BpBet} from 'app/shared/models/bpBet.model';
import {EmailTemplateService} from 'app/shared/services/emailTemplate.service';
import {RechtformService} from 'app/shared/services/rechtform.service';
import {ProdMediaService} from 'app/shared/services/production-media.service';
import {rechform} from 'app/shared/models/rechtform.model';
import Swal from 'sweetalert2';
import {ToastService} from 'app/shared/services/toast.service';
import {BetriebService} from 'app/shared/services/betrieb.service';
import {TitleService} from 'app/shared/services/title.service';
import {verlaglistService} from 'app/shared/services/verlaglist.service';
import {VerlagBuchunListModel} from 'app/shared/models/verlagBuchunList.model';
import {sortSuggestion} from 'app/shared/util/sort-util';
import {ContractService} from 'app/shared/services/contract.service';
import {GlobalVariableService} from 'app/shared/global-variable/globalVariable.service';
import {InterestMailService} from 'app/shared/services/interestMail.service';
import {BuchungService} from 'app/shared/services/buchung.service';
import {FeedbackComponent} from 'app/shared/child_components/feedback/feedback.component';
import {SubscriptionNotiz} from 'app/shared/subscriptions/supscription.notiz';
import {MenuEintragModel} from 'app/shared/models/production-menu.model';
import {TrackerService} from "../../core/tracker/tracker.service";
import {TrackerService2} from "../../core/tracker/tracker-2.service";
import {TrackerService3} from "../../core/tracker/tracker-3.service";
import {TrackerService4} from "../../core/tracker/tracker-4.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss', '../../../../../../node_modules/sweetalert2/src/sweetalert2.scss'],
  providers: [BpService, prodHTTPService, NgbCarouselConfig],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('mobileMenuTop', [
      state(
        'no-block, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state(
        'yes-block',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('no-block <=> yes-block', [animate('400ms ease-in-out')]),
    ]),
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translate3d(0, 0, 0)',
        })
      ),
      state(
        'out',
        style({
          transform: 'translate3d(100%, 0, 0)',
        })
      ),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out')),
    ]),
    trigger('slideOnOff', [
      state(
        'on',
        style({
          transform: 'translate3d(0, 0, 0)',
        })
      ),
      state(
        'off',
        style({
          transform: 'translate3d(100%, 0, 0)',
        })
      ),
      transition('on => off', animate('400ms ease-in-out')),
      transition('off => on', animate('400ms ease-in-out')),
    ]),
    trigger('fadeInOutTranslate', [
      transition(':enter', [style({ opacity: 0 }), animate('400ms ease-in-out', style({ opacity: 1 }))]),
      transition(':leave', [style({ transform: 'translate(0)' }), animate('400ms ease-in-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class AdminComponent implements OnInit {
  navType: string;
  themeLayout: string;
  layoutType: string;
  verticalPlacement: string;
  verticalLayout: string;
  deviceType: string;
  verticalNavType: string;
  verticalEffect: string;
  vNavigationView: string;
  pcodedHeaderPosition: string;
  pcodedSidebarPosition: string;
  headerTheme: string;
  logoTheme: string;

  innerHeight: string;
  windowWidth: number;

  toggleOn: boolean;
  leftSideNevBarOpen: any;

  headerFixedMargin: string;
  navBarTheme: string;
  activeItemTheme: string;

  isCollapsedMobile: string;
  isCollapsedCenter: string;

  isCollapsedSideBar: string;
  isCollapsedSubSideBar: string;
  chatToggle: string;
  showNotes: boolean = false;
  chatToggleInverse: string;
  chatInnerToggle: string;
  chatInnerToggleInverse: string;
  angebot: boolean = false;
  menuTitleTheme: string;
  itemBorder: boolean;
  itemBorderStyle: string;
  subItemBorder: boolean;
  subItemIcon: string;
  dropDownIcon: string;
  configOpenRightBar: string;
  isSidebarChecked: boolean;
  isHeaderChecked: boolean;
  account: Account;
  verknupfungchecklength: boolean = false;
  status: DashboardModel;
  check: any = false;
  newbetrieb: Betrieb = new Betrieb();
  searching = false;
  listerform: Listerform[] = [];
  public bp: Bp = new Bp();
  bpimage: BpImage = new BpImage();
  spinner: boolean = true;
  verknupfung: BpBetVerknupfung[] = [];
  aktiveBetVerknufId;
  betrieb: Betrieb[] = [];
  betriebImage: string;
  public aktivBetrieb: BpBet = null;
  public aktivBetriebObject: Betrieb = null;
  full: boolean = false;
  betriebFull: boolean = false;
  wissensdatenbank: any = ekp_kb;
  stageMenuList = [];
  werkMenuList = [];
  productionMenuList = [];
  // @ViewChild('searchFriends') search_friends: ElementRef;
  closeResult: string;
  liland: Liland[] = [];
  aktivVerknupftesBetreib: BpBetVerknupfung = new BpBetVerknupfung();
  navigation: boolean = true;
  knowledgebase: boolean = false;
  betriebnav: boolean = false;
  support: boolean = false;
  contracts: boolean = false;
  meinProfile: boolean = false;
  organisation: boolean = false;
  aktivBetriebVerifier: boolean = false;
  shownotify: boolean;
  showprofile: boolean;
  showplus: boolean;
  production: boolean = false;
  stage: boolean = false;
  werk: boolean = false;
  mailDetailInteresse: { type: string };
  txtmsg: string;
  allowUserTOEditBetribe: boolean = true;
  position = 'bottom-right';
  securityObject: BetriebSecurityModel = new BetriebSecurityModel(null, null, null, null);
  callNotificationComponent: boolean = false;
  amIVerknupf: boolean = false;
  iMadeVerknupf: boolean = false;
  activeandverknupf: boolean = false;
  naigationPageAccess: boolean = false;
  userImageTopNavigation;
  versionsnummer: any = ekp_Version;
  angebotLink: boolean = false;
  urlState: string = null;
  routeStateName: string = null;
  routerState: string = null;
  buchungListForAktiveBetVerlag: Array<VerlagBuchunListModel> = [];
  vertragRouteDisplay: boolean = false;
  checkPdfPreviewRouter = null;
  doesAktivUserHasKunstlerProfile: boolean = false;
  approvalcheck: boolean = false;
  public queryParamList: any = '';
  public aktivBetPendingContractList: number = 0;
  menuEintrags: MenuEintragModel[] = [];
  executeOrNot: boolean = true;
  underconstruction = SERVER_UNDER_CONSTRUCTION;

  todayYear: string = "2022";

  constructor(
    private trackerService: TrackerService,

    private trackerService2: TrackerService2,
    private trackerService3: TrackerService3,
    private trackerService4: TrackerService4,
    private loginService: LoginService,
    private principal: AccountService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    public betriebServiceAdmin: BetriebService,
    private verknupfungService: BpBetVerknupfungService,
    private aktiv_betriebServiceAdmin: BpBetService,
    private prodHttpService: prodHTTPService,
    private betriebAdresseService: AdresseService,
    private bpService: BpService,
    private listerformService: RechtformService,
    private landService: LilandService_bp,
    private mitarbeiterService: MitarbeiterService,
    private globalService: GlobalSearchService,
    private emailTemplateService: EmailTemplateService,
    private productionMediaService: ProdMediaService,
    private betribeSecurity: BetribeSecurityService,
    private werkService: WerkService,
    private stageService: StageService,
    private toastService: ToastService,
    private titleService: TitleService,
    private verlagBuchungService: verlaglistService,
    public contractService: ContractService,
    private globalVariable: GlobalVariableService,
    private emailPrufungService: InterestMailService,
    public buchungService: BuchungService,

    config: NgbCarouselConfig,
    private feedbackComponent: FeedbackComponent,
    private subscriptionNotiz: SubscriptionNotiz
  ) {
    this.navType = 'st5';
    this.themeLayout = 'vertical';
    this.vNavigationView = 'view1';
    this.verticalPlacement = 'left';
    // this.verticalLayout = 'box';
    this.deviceType = 'desktop';
    this.verticalNavType = 'expanded';
    this.verticalEffect = 'shrink';
    this.pcodedHeaderPosition = 'fixed';
    this.pcodedSidebarPosition = 'fixed';
    this.headerTheme = 'theme1';
    this.logoTheme = 'theme1';
    this.toggleOn = true;

    this.headerFixedMargin = '80px';
    this.navBarTheme = 'themelight1';
    this.activeItemTheme = 'theme4';

    this.isCollapsedMobile = 'no-block';
    this.isCollapsedCenter = 'no-block';
    this.isCollapsedSideBar = 'no-block';
    this.isCollapsedSubSideBar = 'no-block';

    this.chatToggle = 'out';
    this.chatToggleInverse = 'in';
    this.chatInnerToggle = 'off';
    this.chatInnerToggleInverse = 'on';

    this.menuTitleTheme = 'theme5';
    this.itemBorder = true;
    this.itemBorderStyle = 'none';
    this.subItemBorder = true;
    this.subItemIcon = 'style6';
    this.dropDownIcon = 'style1';
    this.isSidebarChecked = true;
    this.isHeaderChecked = true;

    const scrollHeight = window.screen.height - 150;
    this.innerHeight = scrollHeight + 'px';
    this.windowWidth = window.innerWidth;
    this.setMenuAttributes(this.windowWidth);
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.loadCurrentRoute();
    });

    // customize default values of carousels used by this component tree
    config.interval = 8000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
    config.showNavigationIndicators = false;

    this.route.queryParams.subscribe((params: any) => {
      this.queryParamList = params;
    });
  }

  public ngOnInit() {
    this.todayYear = (new Date).getFullYear().toString();
    this.showNotes = false;
    this.spinner = true;
    this.togglemobile();
    this.principal.identity().subscribe((account: Account) => {
      this.landService.query().subscribe((land: Liland[]) => {
        this.liland = sortSuggestion(land);
      });
      if (account == null) {
        this.executeOrNot = true;
        this.spinner = false;
      } else {
        this.executeOrNot = false;
        this.account = account;
        this.loadBPData();
      }
      this.listerformService.query().subscribe((rechtforms: rechform[]) => {
        this.listerform = rechtforms;
      });
      console.log(this.account);
    });
  }

  refreshNgOnInit() {
    this.ngOnInit();
  }

  loadCurrentRoute() {
    this.routerState = null;
    let currentRoute = this.route.root,
      url = '';
    do {
      const childrenRoutes = currentRoute.children;
      currentRoute = null;
      childrenRoutes.forEach(routes => {
        if (routes.outlet === 'primary') {
          const routeSnapshot = routes.snapshot;
          url += routeSnapshot.url.map(segment => segment.path);
          this.urlState = url;
          this.openCloseNavigatorPanel(this.urlState);
          if (routes.snapshot.routeConfig.path == 'pdf-preview') {
            this.checkPdfPreviewRouter = 'pdf-preview';
          }
          if (routes.snapshot.routeConfig.path.includes('view')) {
            let stringSplit = this.urlState.split(',');
            this.routeStateName = stringSplit[stringSplit.length - 1];
            this.routerState = stringSplit[0];
            if (this.routerState == 'production-view') {
              this.titleService.getProdInfo(this.routeStateName);
            } else if (this.routerState == 'werk-view') {
              this.titleService.getWerkInfo(this.routeStateName);
            } else if (this.routerState == 'stage-view') {
              this.titleService.getSpielInfo(this.routeStateName);
            } else if (this.routerState == 'betrieb_view') {
              this.titleService.getBetInfo(this.routeStateName);
            } else if (this.routerState == 'user' && this.urlState.includes('view')) {
              this.titleService.getBenutzerInfo(this.routeStateName);
            }
          } else if (routes.snapshot.routeConfig.path == 'pdf-preview') {
            this.toggleOpened();
            this.onClickedOutside(null);
            this.titleService.boot();
          } else if (routes.snapshot.routeConfig.path.includes('homepage') || routes.snapshot.routeConfig.path == '') {
            if (this.checkPdfPreviewRouter == 'pdf-preview') {
              this.toggleOpened();
              this.onClickedOutside(null);
            }
            this.titleService.homePageTitleDescription();
          } else {
            this.titleService.boot();
          }
          currentRoute = routes;
        }
      });
    } while (currentRoute);
  }

  // opennotes(){
  //   this.feedbackComponent.openNotes()
  //   this.feedbackComponent.refreschData('nothing');
  // }

  openNotizen(temp) {
    this.subscriptionNotiz.emitSubscription({id:this.aktivBetrieb.betriebsId,name:temp,bpId:this.bp.id});
  }

  updateShowNotes(event) {
    console.log("updating");
    this.showNotes = event;
  }
  openCloseNavigatorPanel(urlString: string) {
    if (
      urlString.includes('betrieb_view') ||
      urlString.includes('betriebe') ||
      urlString.includes('settings') ||
      urlString.includes('businessconnection') ||
      urlString.includes('angebot') ||
      urlString.includes('productgroup') ||
      urlString.includes('vertrieb') ||
      urlString.includes('verlaglist')
    ) {
      this.production = false;
      this.stage = false;
      this.werk = false;
      this.betriebnav = true;
      this.support = false;
      this.contracts = false;
    } else if (urlString.includes('production-view')) {
      this.production = true;
      this.stage = false;
      this.werk = false;
      this.betriebnav = false;
      this.support = false;
      this.contracts = false;
    } else if (urlString.includes('werk-view')) {
      this.werk = true;
      this.stage = false;
      this.production = false;
      this.betriebnav = false;
      this.support = false;
      this.contracts = false;
    } else if (urlString.includes('stage-view')) {
      this.stage = true;
      this.werk = false;
      this.production = false;
      this.betriebnav = false;
      this.support = false;
      this.contracts = false;
    } else if (urlString.includes('betrieb_view')) {
      this.betriebnav = true;
      this.stage = false;
      this.werk = false;
      this.production = false;
      this.support = false;
      this.contracts = false;
    } else if (urlString.includes('mitwirkende')) {
      this.betriebnav = true;
      this.stage = false;
      this.werk = false;
      this.production = false;
      this.support = false;
      this.contracts = false;
    } else if (urlString.includes('contract-verwaltung')) {
      this.betriebnav = false;
      this.stage = false;
      this.werk = false;
      this.production = false;
      this.support = false;
      this.contracts = true;
    } else if (urlString.includes('faq') || urlString.includes('tutorials')) {
      this.betriebnav = false;
      this.stage = false;
      this.werk = false;
      this.production = false;
      this.support = true;
      this.contracts = false;
    } else {
      this.betriebnav = false;
      this.stage = false;
      this.werk = false;
      this.production = false;
      this.support = false;
      this.contracts = false;
    }
  }

  loadBPData() {
    this.bpService.makebp(this.account).subscribe(
      (bp: Bp) => {
        this.bp = bp;
        this.loadAktivBetrieb(this.bp.id);
        this.loadBPImage();
        this.bpService.changeStatus().subscribe(
          status => {
            this.status = status;
            this.full = this.status.voll;
            this.spinner = false;
          },
          () => {
            this.full = false;
          }
        );
      },
      () => {
        this.bpService.query().subscribe((bp: Bp) => {
          this.bp = bp;
          this.loadAktivBetrieb(this.bp.id);
          this.loadBPImage();
          this.bpService.changeStatus().subscribe(
            status => {
              this.status = status;
              this.full = this.status.voll;
              this.spinner = false;
            },
            () => {
              this.full = false;
            }
          );
        });
      }
    );
    /*    if (this.principal.isAuthenticated()) {
      // this.verticalNavType = 'expanded';
    }*/
    // extra call no need, not used any where in this component
  }

  loadBPImage() {
    this.bpService.queryImageBp(this.bp.id).subscribe(
      (bpImage: BpImage[]) => {
        if (bpImage.length != 0) {
          this.bpimage = bpImage[0];
          this.check = this.bpimage.bild != null;
        } else {
          this.check = false;
        }
        this.stringImage();
      },
      error => {
        if (error.status == 404) {
          this.check = false;
        }
      }
    );
  }

  callSecurityAPI() {
    this.securityObject = new BetriebSecurityModel('/betriebe/Stammdaten/{id}', 'PUT', this.aktivBetrieb.betriebsId, 'BETRIEB_ID');
    this.betribeSecurity.checkAccessRights(this.securityObject).subscribe(response => {
      this.allowUserTOEditBetribe = response;
    });
  }

  // changeStatus(component, i, angebotId, statusID, command) {
  //   if (component == 'werk') {
  //     if (command == 'delete') {
  //     } else if (command == 'update') {
  //       let statusObject = new AngeWerkStatusMode(angebotId, null, null, statusID, 'O', null, null, null);
  //       this.werkService.updateStatus(statusObject).subscribe(updatedStatusObject => {
  //         this.werkMenuList[i].status = updatedStatusObject.status;
  //         this.werkMenuList[i].status_id = updatedStatusObject.id;
  //       });
  //     }
  //   } else if (component == 'stage') {
  //     if (command == 'delete') {
  //     } else if (command == 'update') {
  //       let statusObject = new AngeSpielStatusModel(angebotId, null, null, statusID, 'O', null, null, null);
  //       this.stageService.updateStatus(statusObject).subscribe(updatedStatusObject => {
  //         this.stageMenuList[i].status = updatedStatusObject.status;
  //         this.stageMenuList[i].status_id = updatedStatusObject.id;
  //       });
  //     }
  //   } else if (component == 'production') {
  //     if (command == 'delete') {
  //     } else if (command == 'update') {
  //       let statusObject: AngeProdStatus = {
  //         angeProdId: angebotId,
  //         freigabeAm: null,
  //         freigabeVonBenutzer: null,
  //         id: statusID,
  //         status: 'O',
  //         vorschlagAm: null,
  //         vorschlagSerial: null,
  //         vorschlagVonBenutzer: null,
  //       };
  //
  //       this.prodHttpService.updateStatus(statusObject).subscribe(updatedStatusObject => {
  //         this.productionMenuList[i].status = updatedStatusObject.status;
  //         this.productionMenuList[i].status_id = updatedStatusObject.id;
  //       });
  //     }
  //   }
  // }

  foreignCall() {
    this.menuEintrags = [];
    this.prodHttpService.getMenuEintrag(this.aktivBetrieb.betriebsId).subscribe(mainObject => {
      this.menuEintrags = mainObject;
    });
  }

  loadAktivBetrieb(id) {
    if (id != null && id != undefined) {
      this.aktiv_betriebServiceAdmin
        .query({
          bpsId: id,
        })
        .subscribe((response: BpBet[]) => {
          if (response.length != 0) {
            this.aktivBetriebVerifier = true;
            this.aktivBetrieb = response[0];
            // this.feedbackComponent.ngOnInit();
            this.trackerService.connect(this.account.id, this.aktivBetrieb.betriebsId);
            this.trackerService2.connect(this.account.id, this.aktivBetrieb.betriebsId);
            this.trackerService3.connect(this.account.id, this.aktivBetrieb.betriebsId);
            this.trackerService4.connect(this.account.id, this.aktivBetrieb.betriebsId);
            this.menuEintrags = [];
            this.prodHttpService.getMenuEintrag(this.aktivBetrieb.betriebsId).subscribe(mainObject => {
              this.menuEintrags = mainObject;
            });
            /*  useless code by Parth
          if (response.length != 0) {
              this.callSecurityAPI();
            } else {
              this.allowUserTOEditBetribe = false;
            }
            we have this.aktivBetriebVerifier variable which checks the same
            if (this.aktivBetrieb) {
              this.callNotificationComponent = true;
            }*/
            this.trackerService2.receive().subscribe((name: string) => {
              if (name.includes('base64') || name == '') {
                this.userImageTopNavigation = name;
                this.check = true;
                if (name == '') {
                  this.check = false;
                  this.betriebImage = null;
                }
              } else {
                let bpObject: any = JSON.parse(name);
                this.bp.vorname = bpObject.vorname;
                this.bp.nachname = bpObject.nachname;
              }
            });
            this.trackerService3.receive().subscribe((name: string) => {
              if (name.includes('base64') || name == '') {
                this.betriebImage = name;
                if (name == '') {
                  this.betriebImage = null;
                }
              } else {
                let betriebObject: any = JSON.parse(name);
                this.aktivBetrieb.betriebsname = betriebObject.betriebsname;
                this.aktivBetrieb.betriebstatus = betriebObject.betriebstatus;
              }
            });
            this.trackerService.receiveVertrag().subscribe((name: string) => {
              if (name != 'benachrichtigung') {
                this.contractService
                  .getBuchungContractQueryOffeneNummer(
                    { freigabeBetriebId: this.aktivBetrieb.betriebsId, anlegerBetriebId: this.aktivBetrieb.betriebsId },
                    this.aktivBetrieb.betriebsId
                  )
                  .subscribe(count => {
                    this.aktivBetPendingContractList = count;
                  });
              }
            });

            this.callSecurityAPI();
            this.checkToDIsplayVerlagPageRoute();
            this.checkToDisplayVertragRoute();
            this.betriebServiceAdmin.findCrowd(this.aktivBetrieb.betriebsId).subscribe((betrieb: Betrieb) => {
              this.aktivBetriebObject = betrieb;
              this.betriebImageLoad();
              this.getVerknupfungOfAktivUser();
              this.getAktivBetContractAndVorlage();
              this.checkBetriebFull(this.aktivBetriebObject.id);
              /*            also not using   this.angebots any where and this.angebotLink checking at product menu page
              this.prodHttpService.getAllAngebotofBetrieb({ betriebsId: this.aktivBetriebObject.id }).subscribe((response: any) => {
                this.angebots = response;
                // this.angebotLink = this.angebots.length != 0;
              });*/

              let object = {
                api_type: 'menu',
                betrieb_id: this.aktivBetrieb.betriebsId,
                produktion_id: null,
              };
              // this.prodHttpService.getProductionIDFromMenu(object).subscribe(mainObject => {
              //   let stages = mainObject.filter(value => value.produktion_type == 0);
              //   let productions = mainObject.filter(value => value.produktion_type == 2);
              //   let werks = mainObject.filter(value => value.produktion_type == 1);
              //   this.stageMenuList = stages;
              //   this.productionMenuList = productions;
              //   this.werkMenuList = werks;
              //   this.angebotLink = mainObject.length != 0;
              //   this.sortProdWerkSpielstateListOfNavigation();
              // });
              this.aktivBetriebObject = betrieb;
              this.approvalcheck = betrieb.prufungAngefragt;
            });
          } else {
            this.aktivBetriebVerifier = false;
            this.doesAktivUserHasKunstlerProfile = false;
            /*  1.09.2021 we discussed and conclued that we fall to this senario we dont need to make this call
            this.verknupfungService
              .queryAnleger({
                bpsId: this.bp.id,
                freigabeBenutzer: 'JA',
                freigabeBetrieb: 'NEIN',
              })
              .subscribe((response: BpBetVerknupfung[]) => {
                this.verknupfung = response;
                this.aktivVerknupftesBetreib = this.verknupfung[0];
              });*/
            this.spinner = false;
            this.leftSideNevBarOpen = document.getElementById('leftSideNevBarOpen');
          }
        });
    } else {
      this.spinner = false;
      this.leftSideNevBarOpen = document.getElementById('leftSideNevBarOpen');
    }
  }

  getVerknupfungOfAktivUser() {
    this.iMadeVerknupf = false;
    this.amIVerknupf = false;
    this.activeandverknupf = false;
    this.verknupfungService
      .queryAnleger({
        bpsId: this.bp.id,
      })
      .subscribe((response: BpBetVerknupfung[]) => {
        this.verknupfung = response;
        this.doesAktivUserHasKunstlerProfile = this.verknupfung.filter(value => value.betriebTyp == 1).length != 0;
        let index: number = this.verknupfung.findIndex(value => value.betriebsId == this.aktivBetriebObject.id);
        this.aktiveBetVerknufId = this.verknupfung[index].id;
        if (this.verknupfung[index].angelegter == this.bp.id) {
          this.iMadeVerknupf = true;
        }
        if (
          (this.verknupfung[index].freigabeBenutzer == 'JA' && this.verknupfung[index].freigabeBetrieb == 'NEIN') ||
          (this.verknupfung[index].freigabeBenutzer == 'NEIN' && this.verknupfung[index].freigabeBetrieb == 'JA')
        ) {
          this.amIVerknupf = true;
        }
        if (
          this.verknupfung[index].freigabeBenutzer == 'JA' &&
          this.verknupfung[index].freigabeBetrieb == 'JA' &&
          this.verknupfung[index].betriebstatus == 2
        ) {
          this.activeandverknupf = true;
        }
        if (
          ((this.verknupfung[index].freigabeBenutzer == 'JA' && this.verknupfung[index].freigabeBetrieb == 'NEIN') ||
            (this.verknupfung[index].freigabeBenutzer == 'JA' && this.verknupfung[index].freigabeBetrieb == 'JA')) &&
          (this.verknupfung[index].betriebstatus == 2 || this.verknupfung[index].betriebstatus == 0) &&
          this.status.aktBetrieb
        ) {
          this.naigationPageAccess = true;
        }
        if (index != -1) {
          this.verknupfungchecklength = true;
          this.verknupfung.splice(index, 1);
        }
        this.verknupfung.forEach(value => {
          if (value.betriebTyp == 1) {
            this.aktiv_betriebServiceAdmin.getKunstlerBetriebName(value.betriebsId).subscribe(betName => {
              value.betriebsname = betName;
            });
          }
        });
        this.spinner = false;
        this.leftSideNevBarOpen = document.getElementById('leftSideNevBarOpen');
      });
  }

  betriebImageLoad() {
    this.betriebServiceAdmin.queryImage(this.aktivBetriebObject.id).subscribe(
      (bild: Betriebebild[]) => {
        if (bild.length != 0 && bild[0].media != null) {
          this.betriebImage = 'data:' + bild[0].mediaContentType + ';base64,' + bild[0].media;
        } else {
          this.betriebImage = null;
        }
      },
      error => {}
    );
  }

  checkToDIsplayVerlagPageRoute() {
    this.verlagBuchungService.getProdVerlagBuchungList(this.aktivBetrieb.betriebsId).subscribe(verlagList => {
      this.buchungListForAktiveBetVerlag = verlagList;
    });
  }

  checkToDisplayVertragRoute() {
    this.contractService.dashboardVertragButtonDislpay(this.aktivBetrieb.betriebsId).subscribe(res => {
      this.vertragRouteDisplay = res;
    });
  }

  sortProdWerkSpielstateListOfNavigation() {
    this.stageMenuList.sort((a, b) => a.produkt_name.localeCompare(b.produkt_name));
    this.werkMenuList.sort((a, b) => a.produkt_name.localeCompare(b.produkt_name));
    this.productionMenuList.sort((a, b) => a.produkt_name.localeCompare(b.produkt_name));
  }

  checkBetriebFull(id: number) {
    this.betriebServiceAdmin.checkBetriebValidation(id).subscribe((check: boolean) => {
      this.betriebFull = check;
    });
  }

  checkDashboardStatus() {
    this.bpService.changeStatus().subscribe(
      status => {
        this.status = status;
        this.full = this.status.voll;
        this.spinner = false;
      },
      () => {
        this.full = false;
      }
    );
  }

  changeAktivBetrieb(id: number) {
    this.aktivBetrieb.betriebsId = id;
    this.aktiv_betriebServiceAdmin.create(this.aktivBetrieb).subscribe((response: BpBet) => {
      // this.feedbackComponent.ngOnInit();
      this.navigateToDashboardAfterSave();
    });
    this.isCollapsedSideBar = 'no-block';
    this.isCollapsedSubSideBar = 'no-block';
  }

  changeAktivBetriebWithArtistNavigation(betId: number) {
    this.aktivBetrieb.betriebsId = betId;
    this.aktiv_betriebServiceAdmin.create(this.aktivBetrieb).subscribe((response: BpBet) => {
      this.router.navigate(['/artist', betId]).then(() => {
        window.location.reload();
      });
    });
    this.isCollapsedSideBar = 'no-block';
    this.isCollapsedSubSideBar = 'no-block';
  }

  changeAktivBetriebWithBetriebNavigation(betId: number, betName: string) {
    this.aktivBetrieb.betriebsId = betId;
    this.aktiv_betriebServiceAdmin.create(this.aktivBetrieb).subscribe((response: BpBet) => {
      this.router.navigate(['/betriebe'], { queryParams: { id: betId }, fragment: betName }).then(() => {
        window.location.reload();
      });
    });
    this.isCollapsedSideBar = 'no-block';
    this.isCollapsedSubSideBar = 'no-block';
  }

  changeVerknupftesBetrieb(nextBetrieb: BpBetVerknupfung) {
    this.aktivVerknupftesBetreib = nextBetrieb;
    this.isCollapsedSideBar = 'no-block';
    this.isCollapsedSubSideBar = 'no-block';
  }

  stringImage() {
    this.userImageTopNavigation = 'data:' + this.bpimage.bildContentType + ';base64,' + this.bpimage.bild;
    // return 'data:' + this.bpimage.bildContentType + ';base64,' + this.bpimage.bild;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  toolTipText(validate: boolean) {
    if (validate) {
      return 'Bitte legen Sie erst einen Betrieb an';
    } else {
      return null;
    }
  }

  login() {
    this.loginService.login();
  }

  logout() {
    this.loginService.logout();
  }

  onResize(event) {
    this.innerHeight = event.target.innerHeight + 'px';
    /* menu responsive */
    this.windowWidth = event.target.innerWidth;
    let reSizeFlag = true;
    if (this.deviceType === 'tablet' && this.windowWidth >= 768 && this.windowWidth <= 1024) {
      reSizeFlag = false;
    } else if (this.deviceType === 'mobile' && this.windowWidth < 768) {
      reSizeFlag = false;
    }
    /* for check device */
    if (reSizeFlag) {
      this.setMenuAttributes(this.windowWidth);
    }
  }

  setMenuAttributes(windowWidth) {
    if (windowWidth >= 768 && windowWidth <= 1024) {
      this.deviceType = 'tablet';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'push';
    } else if (windowWidth < 768) {
      this.deviceType = 'mobile';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'overlay';
    } else {
      this.deviceType = 'desktop';
      this.verticalNavType = 'expanded';
      this.verticalEffect = 'shrink';
    }
  }

  toggleOpened() {
    if (this.windowWidth < 768) {
      this.toggleOn = this.verticalNavType === 'offcanvas' ? true : this.toggleOn;
    } else {
      this.verticalNavType = this.verticalNavType === 'expanded' ? 'offcanvas' : 'expanded';
    }
  }

  onClickedOutside(e: any) {
    if (this.windowWidth < 768 && this.toggleOn && this.verticalNavType == 'offcanvas') {
      this.toggleOn = true;
      this.verticalNavType = 'expanded';
    } else if (this.windowWidth < 768 && this.toggleOn && this.verticalNavType == 'expanded') {
      this.toggleOn = false;
      this.verticalNavType = 'offcanvas';
    }
  }

  onMobileMenu() {
    this.isCollapsedMobile = this.isCollapsedMobile === 'yes-block' ? 'no-block' : 'yes-block';
  }

  togglemobile() {
    if (this.windowWidth <= 1024) {
      this.toggleOn = false;
      this.verticalNavType = 'offcanvas';
    }
  }

  toggleChat() {
    this.chatToggle = this.chatToggle === 'out' ? 'in' : 'out';
    this.chatToggleInverse = this.chatToggleInverse === 'out' ? 'in' : 'out';
    this.chatInnerToggle = 'off';
    this.chatInnerToggleInverse = 'off';
  }

  toggleChatInner() {
    this.chatInnerToggle = this.chatInnerToggle === 'off' ? 'on' : 'off';
    this.chatInnerToggleInverse = this.chatInnerToggleInverse === 'off' ? 'on' : 'off';
  }

  // searchFriendList(event) {
  //     const search = (this.search_friends.nativeElement.value).toLowerCase();
  //     let search_input: string;
  //     let search_parent: any;
  //     const friendList = document.querySelectorAll('.userlist-box .media-body .chat-header');
  //     Array.prototype.forEach.call(friendList, function (elements, index) {
  //         search_input = (elements.innerHTML).toLowerCase();
  //         search_parent = (elements.parentNode).parentNode;
  //         if (search_input.indexOf(search) !== -1) {
  //             search_parent.classList.add('show');
  //             search_parent.classList.remove('hide');
  //         } else {
  //             search_parent.classList.add('hide');
  //             search_parent.classList.remove('show');
  //         }
  //     });
  // }

  toggleOpenedSidebar() {
    this.isCollapsedSideBar = this.isCollapsedSideBar === 'yes-block' ? 'no-block' : 'yes-block';
  }

  toggleRightbar() {
    this.configOpenRightBar = this.configOpenRightBar === 'open' ? '' : 'open';
  }

  navigate() {
    this.router.navigate(['/betriebe'], {
      fragment: this.newbetrieb.betriebsname,
      queryParams: { id: this.newbetrieb.id },
    });
  }

  open(content) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  navigateAfterSave() {
    this.reload();
  }

  navigateToDashboardAfterSave() {
    if (this.router.url == '/dashboard') {
      location.reload();
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  reload() {
    location.reload();
  }

  changelayout() {
    this.verticalLayout = this.verticalLayout == 'wide' ? 'box' : 'wide';
  }

  customAccordion(type) {
    if (type == 'navigation') {
      this.knowledgebase = false;
      this.support = false;
      this.production = false;
      this.stage = false;
      this.werk = false;
      this.betriebnav = false;
      this.contracts = false;
      this.navigation = !this.navigation;
    } else if (type == 'support') {
      this.production = false;
      this.stage = false;
      this.werk = false;
      this.knowledgebase = false;
      this.navigation = false;
      this.contracts = false;
      this.betriebnav = false;
      this.support = !this.support;
    } else if (type == 'meinProfile') {
      this.meinProfile = !this.meinProfile;
    } else if (type == 'organisation') {
      this.organisation = !this.organisation;
    } else if (type == 'production') {
      this.knowledgebase = false;
      this.navigation = false;
      this.support = false;
      this.stage = false;
      this.werk = false;
      this.betriebnav = false;
      this.contracts = false;
      this.production = !this.production;
    } else if (type == 'stage') {
      this.knowledgebase = false;
      this.navigation = false;
      this.support = false;
      this.production = false;
      this.werk = false;
      this.betriebnav = false;
      this.contracts = false;
      this.stage = !this.stage;
    } else if (type == 'werk') {
      this.knowledgebase = false;
      this.navigation = false;
      this.support = false;
      this.production = false;
      this.stage = false;
      this.betriebnav = false;
      this.contracts = false;
      this.werk = !this.werk;
    } else if (type == 'angebot') {
      this.knowledgebase = false;
      this.navigation = false;
      this.support = false;
      this.production = false;
      this.stage = false;
      this.werk = false;
      this.betriebnav = false;
      this.contracts = false;
      this.angebot = !this.angebot;
    } else if (type == 'betrieb') {
      this.knowledgebase = false;
      this.navigation = false;
      this.support = false;
      this.production = false;
      this.stage = false;
      this.werk = false;
      this.angebot = false;
      this.contracts = false;
      this.betriebnav = !this.betriebnav;
    } else if (type == 'contracts') {
      this.knowledgebase = false;
      this.navigation = false;
      this.support = false;
      this.production = false;
      this.stage = false;
      this.werk = false;
      this.angebot = false;
      this.betriebnav = false;
      this.contracts = !this.contracts;
    }
  }

  openConfirmsSwal(component, id, angebotID, statusID) {
    if (component == 'production') {
      Swal
        .fire({
          title: 'Sind Sie sicher?',
          text: 'Dieser Schritt kann nicht rückgängig gemacht werden',
          type: 'warning',
          showCancelButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonColor: '#f28d35',
          cancelButtonColor: '#9c9c9c',
          cancelButtonText: 'Abbrechen',
          confirmButtonText: 'Ja, entfernen',
        })
        .then(result => {
          if (result.value) {
            this.removeProduction(id, angebotID, statusID);
            Swal.fire('Entfernt!', 'Die Produktion wurde gelöscht', 'success');
          }
        });
    } else if (component == 'stage') {
      Swal
        .fire({
          title: 'Sind Sie sicher?',
          text: 'Dieser Schritt kann nicht rückgängig gemacht werden',
          type: 'warning',
          showCancelButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonColor: '#f28d35',
          cancelButtonColor: '#9c9c9c',
          cancelButtonText: 'Abbrechen',
          confirmButtonText: 'Ja, entfernen',
        })
        .then(result => {
          if (result.value) {
            this.removeStage(id, angebotID, statusID);
            Swal.fire('Entfernt!', 'Die Spielstätte wurde gelöscht', 'success');
          }
        });
    } else if (component == 'werk') {
      Swal
        .fire({
          title: 'Sind Sie sicher?',
          text: 'Dieser Schritt kann nicht rückgängig gemacht werden',
          type: 'warning',
          showCancelButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonColor: '#f28d35',
          cancelButtonColor: '#9c9c9c',
          cancelButtonText: 'Abbrechen',
          confirmButtonText: 'Ja, entfernen',
        })
        .then(result => {
          if (result.value) {
            this.removeWerk(id, angebotID, statusID);
            Swal.fire('Entfernt!', 'Das Werk wurde gelöscht', 'success');
          }
        });
    }
  }

  removeProduction(prodProdID, angebotID, statusID) {
    if (statusID != null) {
      this.prodHttpService.deleteAngeProdStatus(statusID).subscribe(
        response1 => {
          if (response1 == true) {
            this.prodHttpService.deleteProdProd(prodProdID).subscribe(response3 => {
              if (response3 == true) {
                let object = {
                  api_type: 'menu',
                  betrieb_id: this.aktivBetrieb.betriebsId,
                  produktion_id: null,
                };
                // this.prodHttpService.getProductionIDFromMenu(object).subscribe(mainObject => {
                //   let stages = mainObject.filter(value => value.produktion_type == 0);
                //   let productions = mainObject.filter(value => value.produktion_type == 2);
                //   let werks = mainObject.filter(value => value.produktion_type == 1);
                //
                //   this.stageMenuList = stages;
                //   this.productionMenuList = productions;
                //   this.werkMenuList = werks;
                //   this.route.queryParams.subscribe(params => {
                //     if (params['id'] == prodProdID.toString()) {
                //       this.router.navigate(['dashboard']);
                //     }
                //   });
                // });
              }
            });
          }
        },
        () => {}
      );
    } else {
      this.prodHttpService.deleteProdProd(prodProdID).subscribe(response3 => {
        if (response3 == true) {
          let object = {
            api_type: 'menu',
            betrieb_id: this.aktivBetrieb.betriebsId,
            produktion_id: null,
          };
          // this.prodHttpService.getProductionIDFromMenu(object).subscribe(mainObject => {
          //   let stages = mainObject.filter(value => value.produktion_type == 0);
          //   let productions = mainObject.filter(value => value.produktion_type == 2);
          //   let werks = mainObject.filter(value => value.produktion_type == 1);
          //
          //   this.stageMenuList = stages;
          //   this.productionMenuList = productions;
          //   this.werkMenuList = werks;
          //   this.route.queryParams.subscribe(params => {
          //     if (params['id'] == prodProdID.toString()) {
          //       this.router.navigate(['dashboard']);
          //     }
          //   });
          // });
        }
      });
    }
  }

  removeStage(prodSpielID, angebotID, statusID) {
    if (statusID != null) {
      this.prodHttpService.deleteAngeSpielStatus(statusID).subscribe(
        response1 => {
          if (response1 == true) {
            this.prodHttpService.getProdSpiel(this.aktivBetriebObject.id).subscribe(response2 => {
              let tempProdpiel = response2[0];
              this.prodHttpService.deleteProdSpiel(prodSpielID).subscribe(response3 => {
                if (response3 == true) {
                  this.prodHttpService.deleteBetSpiel(tempProdpiel.spielssId).subscribe(response4 => {
                    this.stageMenuList.splice(
                      this.stageMenuList.findIndex(value => value.produkt_id == prodSpielID),
                      1
                    );
                    this.route.queryParams.subscribe(params => {
                      if (params['id'] == prodSpielID.toString()) {
                        this.router.navigate(['dashboard']);
                      }
                    });
                  });
                }
              });
            });
          }
        },
        () => {}
      );
    } else {
      this.prodHttpService.getProdSpiel(this.aktivBetriebObject.id).subscribe(response2 => {
        let tempProdpiel = response2[0];
        this.prodHttpService.deleteProdSpiel(prodSpielID).subscribe(response3 => {
          if (response3 == true) {
            this.prodHttpService.deleteBetSpiel(tempProdpiel.spielssId).subscribe(response4 => {
              this.stageMenuList.splice(
                this.stageMenuList.findIndex(value => value.produkt_id == prodSpielID),
                1
              );
              this.route.queryParams.subscribe(params => {
                if (params['id'] == prodSpielID.toString()) {
                  this.router.navigate(['dashboard']);
                }
              });
            });
          }
        });
      });
    }
  }

  removeWerk(prodWerkID, angebotID, statusID) {
    if (statusID != null) {
      this.prodHttpService.deleteAngeWerkStatus(statusID).subscribe(
        response1 => {
          if (response1 == true) {
            this.prodHttpService.deleteProdWerk(prodWerkID).subscribe(response3 => {
              if (response3 == true) {
                this.werkMenuList.splice(
                  this.werkMenuList.findIndex(value => value.produkt_id == prodWerkID),
                  1
                );
                this.route.queryParams.subscribe(params => {
                  if (params['id'] == prodWerkID.toString()) {
                    this.router.navigate(['dashboard']);
                  }
                });
              }
            });
          }
        },
        () => {}
      );
    } else {
      this.prodHttpService.deleteProdWerk(prodWerkID).subscribe(response3 => {
        if (response3 == true) {
          this.werkMenuList.splice(
            this.werkMenuList.findIndex(value => value.produkt_id == prodWerkID),
            1
          );
          this.route.queryParams.subscribe(params => {
            if (params['id'] == prodWerkID.toString()) {
              this.router.navigate(['dashboard']);
            }
          });
        }
      });
    }
  }

  showSuccess(options: any) {
    this.toastService.show(options.msg, {
      classname: 'bg-success',
      delay: options.timeout,
      autohide: true,
      headertext: options.title,
    });
  }

  sendMail() {
    this.mailDetailInteresse = { type: 'kontakt' };
    this.emailTemplateService.sendMail(this.bp, '', null, this.txtmsg, null, 'null', 'kontakt');
    this.txtmsg = null;
    this.showSuccess({ title: 'E-Mail wurde gesendet', msg: 'Wir setzen uns so bald wie möglich mit Ihnen in Verbindung', timeout: 5000 });
  }

  clicknotify() {
    this.shownotify = !this.shownotify;
  }

  clickprofile() {
    this.showprofile = !this.showprofile;
  }

  clickplus() {
    this.showplus = !this.showplus;
  }

  clickedInside($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  @HostListener('document:click', ['$event']) clickedOutside($event) {
    if (this.shownotify) {
      this.shownotify = false;
    }
    if (this.showprofile) {
      this.showprofile = false;
    }
    if (this.showplus) {
      this.showplus = false;
    }
  }

  deleteBetConnection(i: number, type) {
    console.log(i, type);
    if (type == 'aktiv') {
      this.verknupfungService.deleteAktivBetVerknupfung(this.aktiveBetVerknufId).subscribe(() => {
        this.reload();
      });
    } else {
      this.verknupfungService.deleteAnleger(i).subscribe(() => {
        this.reload();
      });
    }
  }

  openConfirmsSwalVerknupf(i, type) {
    Swal
      .fire({
        title: 'Sind Sie sicher?',
        text: 'Dieser Schritt kann nicht rückgängig gemacht werden',
        type: 'warning',
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonColor: '#f28d35',
        cancelButtonColor: '#9c9c9c',
        cancelButtonText: 'Abbrechen',
        confirmButtonText: 'Ja, Verknüpfung aufheben',
      })
      .then(result => {
        if (result.value) {
          this.deleteBetConnection(i, type);
          Swal.fire('Verknüpfung aufgehoben!', 'Die Verknüpfung zu diesem Betrieb wurde aufgehoben.', 'success');
        }
      })
      .then(() => this.router.navigate(['/dashboard']));
  }

  redirectToCalendarPage() {
    if (this.urlState == 'calendar') {
      this.router.navigate(['/calendar'], { queryParams: { createTermin: true } });
    } else {
      this.router.navigate(['/calendar'], { queryParams: { createTermin: true } });
    }
  }

  sendMailPrufung(buttonRef: HTMLButtonElement) {
    this.mitarbeiterService.searchdynamicMail(this.bp.email).subscribe(res => {
      this.emailPrufungService.PrufungMailSend(
        null,
        null,
        null,
        res[0].id,
        'something',
        this.aktivBetriebObject.id,
        this.bp,
        this.bp.email,
        'Ihrer Produktion',
        this.bp.email,
        this.aktivBetriebObject.betriebsname
      );
      buttonRef.classList.add('btn-disabled');
      this.betriebServiceAdmin.getPrufungStatus(this.aktivBetriebObject.id).subscribe((status: any) => {
        this.approvalcheck = status;
      });
    });
    this.approvalcheck = true;
  }

  public getAktivBetContractAndVorlage() {
    this.aktivBetPendingContractList = 0;
    this.contractService
      .getBuchungContractQueryOffeneNummer(
        { freigabeBetriebId: this.aktivBetrieb.betriebsId, anlegerBetriebId: this.aktivBetrieb.betriebsId },
        this.aktivBetrieb.betriebsId
      )
      .subscribe(count => {
        this.aktivBetPendingContractList = count;
        // this.aktivBetPendingContractList = vertragList.filter(
        //   value =>
        //     value.vertragsstatus != 5 &&
        //     value.vertragsstatus != 6 &&
        //     !(value?.vertragsstatus == 2 && value?.anlegerBetriebId == this.aktivBetrieb.betriebsId) &&
        //     !(value?.vertragsstatus == 1 && value?.anlegerBetriebId != this.aktivBetrieb.betriebsId) &&
        //     !(
        //       (value?.vertragsstatus == 3 && value?.freigabeBetriebId != this.aktivBetrieb.betriebsId) ||
        //       (value?.vertragsstatus == 4 && value?.anlegerBetriebId != this.aktivBetrieb.betriebsId)
        //     ) &&
        //     value?.vertragsstatus != 0
        // );
        // let temp = vertragList.filter(value => value.vertragsstatus == 0 && value.anlegerBetriebId == this.aktivBetrieb.betriebsId);
        // this.aktivBetPendingContractList = this.aktivBetPendingContractList.concat(temp);
        // this.aktivBetPendingContractList.forEach((value: any) => {
        //   value.checked = false;
        //   value.selected = false;
        // });
      });
  }

  contractBearbeiten(contract) {
    this.router.navigate(['/contract'], { queryParams: { buchId: contract.buchAngeId, redirectFrom: 'contract' } });
  }

  contractCamundaBearbeiten(contract) {
    this.buchungService.getBuchungAngebotWithId(contract.buchAngeId).subscribe(buch => {
      this.router.navigate(['/contract-camunda'], { queryParams: { anbaId: buch.anbaId, redirectFrom: 'contract' } });
    });
  }

  talkBack(data: any) {
    this.showSuccess({
      title: 'Feedback gesendet! ',
      msg: 'Vielen Dank für Ihre Mitteilung.',
      timeout: 5000,
    });
  }
}
