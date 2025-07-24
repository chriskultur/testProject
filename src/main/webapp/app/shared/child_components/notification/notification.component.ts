import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {NotificationService} from 'app/shared/services/notification.service';
import {NavigationEnd, Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BetriebService} from 'app/shared/services/betrieb.service';
import {GescheftbDTO} from 'app/shared/models/gescheftbDTO.model';
import {interval} from 'rxjs';
import {asap} from 'rxjs/internal/scheduler/asap';
import {ToastService} from 'app/shared/services/toast.service';
import {CalendarService} from 'app/shared/services/calendar.service';
import {StageService} from 'app/shared/services/stage.service';
import {ContractService} from "../../services/contract.service";
import dayjs from "dayjs/esm";
import { TrackerService } from 'app/core/tracker/tracker.service';
import { TrackerService2 } from 'app/core/tracker/tracker-2.service';
import { TrackerService4 } from 'app/core/tracker/tracker-4.service';
import { TrackerService3 } from 'app/core/tracker/tracker-3.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss', '../../../../../../../node_modules/sweetalert2/src/sweetalert2.scss'],
})
export class NotificationComponent implements OnInit {
  showprofile: boolean;
  showplus: boolean;
  position = 'bottom-right';
  closeResult: string;
  public listOfNotification = [];
  public listOfNotificationBenachrichtigung = [];
  selectedNotification: { notification: any; key: number };
  notificationTitleForPopUp: string;
  showNumberOfNotification: boolean = false;
  @Input() aktiveBetId;
  @Input() shownotify: boolean;
  // @ts-ignore
  @ViewChild('notificationPopUp') openModalForNotification: ElementRef;

  constructor(
    private contractService: ContractService,
    private notificationService: NotificationService,
    private trackerService: TrackerService,
    private trackerService4: TrackerService4,
    private trackerService3: TrackerService3,
    private router: Router,
    private modalService: NgbModal,
    private betriebSerivce: BetriebService,
    private toastService: ToastService,
    private calendarService: CalendarService,
    private stageService: StageService
  ) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        console.log(e);
        this.getAllNotification(this.aktiveBetId.betriebsId);
        this.getAllNotificationbenachrichtigung(this.aktiveBetId.betriebsId);
      }
    });

  }

  ngOnInit() {
    if (this.aktiveBetId.betriebsId) {
      this.getAllNotification(this.aktiveBetId.betriebsId);
      this.getAllNotificationbenachrichtigung(this.aktiveBetId.betriebsId);
      this.trackerService.receive().subscribe(message => {
        let messageObject: any = JSON.parse(message);
        let index = this.listOfNotificationBenachrichtigung.findIndex(notification => notification.id == messageObject.id);
        if (index == -1) {
          this.listOfNotificationBenachrichtigung.push(messageObject);
        } else {
          this.listOfNotificationBenachrichtigung[index] = messageObject;
        }
        this.listOfNotificationBenachrichtigung = this.listOfNotificationBenachrichtigung.sort(
          (a, b) => +new Date(b.datum) - +new Date(a.datum)
        );
      });
      this.trackerService4.receive().subscribe(message => {
        if (message == 'camunda') {
          this.getAllNotification(this.aktiveBetId.betriebsId);
        }
      });
      this.trackerService3.receiveCamunda().subscribe(message => {
        this.getAllNotification(this.aktiveBetId.betriebsId);
      });

      this.trackerService.receiveVertrag().subscribe((name: string) => {
        if (name == 'benachrichtigung') {
          this.notificationService.getAllKalenderbenachrichtigung(this.aktiveBetId.betriebsId).subscribe(notification => {
            if (notification.length != 0) {
              this.showNumberOfNotification = true;
            }
            this.listOfNotificationBenachrichtigung = notification.sort((a, b) => +new Date(b.datum) - +new Date(a.datum));
          });
        }
      });
      window.setTimeout(
        function () {
          interval(300000, asap).subscribe(() => {
            this.notificationService.getAllNotification(this.aktiveBetId.betriebsId).subscribe(notification => {
              if (notification.length != 0) {
                this.showNumberOfNotification = true;
              }
              this.listOfNotification = notification;
              this.setTitleOfAbstractNotification();
            });
            this.notificationService.getAllKalenderbenachrichtigung(this.aktiveBetId.betriebsId).subscribe(notification => {
              if (notification.length != 0) {
                this.showNumberOfNotification = true;
              }
              this.listOfNotificationBenachrichtigung = notification.sort((a, b) => +new Date(b.datum) - +new Date(a.datum));
            });
          });
        }.bind(this),
        60000
      );
    } else {
      this.getAllNotification(-1);
    }
  }

  getAllNotification(id) {
    this.notificationService.getAllNotification(id).subscribe(notification => {
      if (notification.length != 0) {
        this.showNumberOfNotification = true;
      }
      this.listOfNotification = notification;
      this.setTitleOfAbstractNotification();
    });
  }

  setTitleOfAbstractNotification() {
    this.listOfNotification
      .filter(
        value =>
          value.taskDefinitionKey == 'freigabe_einer_mitwirkendenverknuepfung' ||
          value.taskDefinitionKey == 'freigabe_einer_kuenstlerverknuepfung'
      )
      .map(item => {
        let betKunstName = item.name.split(' von ')[1];
        item.description =
          item.taskDefinitionKey == 'freigabe_einer_kuenstlerverknuepfung'
            ? betKunstName + ' möchte Sie als Mitwirkenden verknüpfen. '
            : betKunstName + ' möchte sich als Mitwirkende/r bei einer Ihrer Produktionen verknüpfen.';
      });
  }

  getAllNotificationbenachrichtigung(aktivbetrieb) {
    this.notificationService.getAllKalenderbenachrichtigung(aktivbetrieb).subscribe(notification => {
      if (notification.length != 0) {
        this.showNumberOfNotification = true;
      }
      this.listOfNotificationBenachrichtigung = notification.sort((a, b) => +new Date(b.datum) - +new Date(a.datum));
    });
  }

  getTimeForNotification(ListOfNotification) {
    let dateFromServer = dayjs(ListOfNotification);
    let currentTimeString = dayjs(Date());

    // @ts-ignore
    if (Math.abs(dateFromServer.diff(currentTimeString, 'days')) > 1) {
      // @ts-ignore
      return 'vor ' + Math.abs(dateFromServer.diff(currentTimeString, 'days')) + ' Tagen';
      // @ts-ignore
    } else if (Math.abs(dateFromServer.diff(currentTimeString, 'days')) == 1) {
      // @ts-ignore
      return 'vor ' + Math.abs(dateFromServer.diff(currentTimeString, 'days')) + ' Tag';
    } else if (
      // @ts-ignore
      Math.abs(dateFromServer.diff(currentTimeString, 'days')) == 0 &&
      // @ts-ignore
      Math.abs(dateFromServer.diff(currentTimeString, 'hours')) > 1
    ) {
      // @ts-ignore
      return 'vor ' + Math.abs(dateFromServer.diff(currentTimeString, 'hours')) + ' Stunden';
    } else if (
      // @ts-ignore
      Math.abs(dateFromServer.diff(currentTimeString, 'days')) == 0 &&
      // @ts-ignore
      Math.abs(dateFromServer.diff(currentTimeString, 'hours')) == 1
    ) {
      // @ts-ignore
      return 'vor ' + Math.abs(dateFromServer.diff(currentTimeString, 'hours')) + ' Stunde';
    } else if (
      // @ts-ignore
      Math.abs(dateFromServer.diff(currentTimeString, 'hours')) == 0 &&
      // @ts-ignore
      Math.abs(dateFromServer.diff(currentTimeString, 'minutes')) > 1
    ) {
      // @ts-ignore
      return 'vor ' + Math.abs(dateFromServer.diff(currentTimeString, 'minutes')) + ' Minuten';
    } else if (
      // @ts-ignore
      Math.abs(dateFromServer.diff(currentTimeString, 'hours')) == 0 &&
      // @ts-ignore
      Math.abs(dateFromServer.diff(currentTimeString, 'minutes')) == 1
    ) {
      // @ts-ignore
      return 'vor ' + Math.abs(dateFromServer.diff(currentTimeString, 'minutes')) + ' Minute';
    } else if (
      // @ts-ignore
      Math.abs(dateFromServer.diff(currentTimeString, 'minutes')) == 0
    ) {
      // @ts-ignore
      return 'vor ' + Math.abs(dateFromServer.diff(currentTimeString, 'seconds')) + ' Sekunden';
    }
  }

  performActionOfNotification(i) {
    if (this.listOfNotification[i].taskDefinitionKey == 'freigabe_einer_Buchung') {
      this.router.navigate(['/calendar']);
    } else {
      this.titleForNotificationPopUp(this.listOfNotification[i].taskDefinitionKey);
      this.notificationService.getSingleNotification(this.listOfNotification[i].id).subscribe(res => {
        this.selectedNotification = { notification: res, key: i };

        // for mitwirkende verknupfung or kunstler veerknupfung
        if (
          this.listOfNotification[i].taskDefinitionKey == 'freigabe_einer_mitwirkendenverknuepfung' ||
          this.listOfNotification[i].taskDefinitionKey == 'freigabe_einer_kuenstlerverknuepfung'
        ) {
          this.setMitwirkendeVerknupfungHelpText();
        }
        this.modalService.open(this.openModalForNotification, { size: 'lg', backdrop: 'static', keyboard: false }).result.then(
          result => {
            this.closeResult = `Closed with: ${result}`;
          },
          reason => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
      });
    }
  }

  setMitwirkendeVerknupfungHelpText() {
    let helpText: string = this.selectedNotification.notification.hilfe;
    let prodList: string = this.selectedNotification.notification.produktion_list_name;
    helpText = helpText.replace('&&&&', this.selectedNotification.notification.kunstlername);
    helpText = helpText.replace('####', this.selectedNotification.notification.mitwirkendename);
    helpText = helpText.replace('$$$$', prodList.length == 0 ? 'Noch keine Produktionen verknüpft.' : prodList);
    this.selectedNotification.notification.hilfe = helpText;
  }

  titleForNotification(type) {
    if (type == 'freigabe_einer_betriebsverknuepfung') {
      return 'Verknüpfungsanfrage';
    } else if (type == 'freigabe_einer_geschaeftsbeziehung') {
      return 'Neue Geschäftsbeziehung';
    } else if (type == 'freigabe_einer_benutzerverknuepfung') {
      return 'Verknüpfungsanfrage';
    } else if (type == 'freigabe_einer_Buchung') {
      return 'Calendar Booking';
    } else if (type == 'freigabe_einer_spielstaettenanlage') {
      return 'Neue Spielstätte';
    } else if (type == 'freigabe_einer_mitwirkendenverknuepfung' || type == 'freigabe_einer_kuenstlerverknuepfung') {
      return 'Neue Verknüpfungsanfrage';
    }
  }

  titleForNotificationPopUp(defination) {
    if (defination == 'freigabe_einer_betriebsverknuepfung') {
      this.notificationTitleForPopUp = 'Verknüpfungsanfrage';
    } else if (defination == 'freigabe_einer_geschaeftsbeziehung') {
      this.notificationTitleForPopUp = 'Neue Geschäftsbeziehung';
    } else if (defination == 'freigabe_einer_benutzerverknuepfung') {
      this.notificationTitleForPopUp = 'Verknüpfungsanfrage';
    } else if (defination == 'freigabe_einer_spielstaettenanlage') {
      this.notificationTitleForPopUp = 'Neue Spielstätte';
    } else if (defination == 'freigabe_einer_mitwirkendenverknuepfung' || defination == 'freigabe_einer_kuenstlerverknuepfung') {
      this.notificationTitleForPopUp = 'Neue Verknüpfungsanfrage';
    }
  }

  redirectToUserProfile() {
    this.router.navigateByUrl(this.selectedNotification.notification.link);
  }

  infoForViewBetBen() {
    if (this.selectedNotification.notification.linkBeschreibung == 'Über den Link gelangen Sie zum Benutzerprofil') {
      return 'Sehen Sie sich den Betrieb ' + this.selectedNotification.notification.link.split('betrieb_view/')[1].split('/')[0] + ' an.';
    } else if (this.selectedNotification.notification.linkBeschreibung == 'Über den Link gelangen Sie zum Betriebsprofil') {
      return 'Sehen Sie sich den Benutzer ' + this.selectedNotification.notification.name.split('möchte')[0] + ' an.';
    }
  }

  declineNotification() {
    if (this.notificationTitleForPopUp == 'Neue Geschäftsbeziehung') {
      let url = 'services/' + this.selectedNotification.notification.ablehnenAPI + this.selectedNotification.notification.dtoID;
      let betName = this.selectedNotification.notification.link.split('/betrieb_view/')[1].split('/')[0];
      this.notificationService.declineNotification(url).subscribe(res => {
        this.showSuccess({
          title: 'Geschäftsbeziehung abgelehnt',
          msg: 'Der Betrieb ' + betName + ' wurde nicht als Ihr Geschäftspartner eingetragen. ',
          timeout: 5000,
        });
        this.listOfNotification.splice(this.selectedNotification.key, 1);
        setTimeout(() => {
          this.reload();
        }, 1000);
      });
    } else if (this.notificationTitleForPopUp == 'Neue Spielstätte') {
      this.spielCamundaDeclined();
      this.showSuccess({ title: 'Verknüpfung mit Spielstätte abgelehnt', msg: 'Die Verknüpfung wurde abgelehnt', timeout: 5000 });
      setTimeout(() => {
        this.reload();
      }, 1000);
    } else {
      let url = 'services/' + this.selectedNotification.notification.ablehnenAPI + this.selectedNotification.notification.dtoID;
      this.notificationService.declineNotification(url).subscribe(res => {
        this.listOfNotification.splice(this.selectedNotification.key, 1);
        setTimeout(() => {
          this.reload();
        }, 1000);
      });
    }
  }

  spielCamundaDeclined() {
    this.stageService.getProduktViewCrowdQuery({ spielssId: this.selectedNotification.notification.dtoID }).subscribe(prodSpiel => {
      let url = 'services/' + this.selectedNotification.notification.ablehnenAPI + this.selectedNotification.notification.dtoID;

      this.notificationService.declineNotification(url).subscribe(res => {
        this.listOfNotification.splice(this.selectedNotification.key, 1);
        setTimeout(() => {
          this.reload();
        }, 1000);
      });
    });
  }

  acceptInvitationThroughNotification() {
    if (this.notificationTitleForPopUp == 'Neue Geschäftsbeziehung') {
      let connction_object;
      this.notificationService.getBusinessConnectionObject(this.selectedNotification.notification.dtoID).subscribe(res => {
        connction_object = res;
        this.betriebSerivce.findCrowd(res.betriebsId).subscribe(resBet => {
          let connectionEstablishment = new GescheftbDTO(
            connction_object.nachbetriebidId,
            resBet.betriebsname,
            null,
            1,
            null,
            null,
            connction_object.gSbCode,
            [],
            [],
            null,
            resBet.id,
            null,
            null,
            null,
            null,
            0
          );
          this.betriebSerivce.createConnection(connectionEstablishment).subscribe(res => {
            this.showSuccess({
              title: 'Geschäftsbeziehung akzeptiert',
              msg: 'Der Betrieb ' + resBet.betriebsname + ' wurde als Ihr Geschäftspartner eingetragen. ',
              timeout: 5000,
            });
            setTimeout(() => {
              this.reload();
            }, 1000);
          });
        });
      });
    } else if (this.notificationTitleForPopUp == 'Neue Spielstätte') {
      let url = 'services/' + this.selectedNotification.notification.freigabeAPI + this.selectedNotification.notification.dtoID;
      this.notificationService.acceptBetribeVerknpfung(url).subscribe(res => {
        this.showSuccess({
          title: 'Verknüpfung bestätigt',
          msg: 'Sie können die Spielstätte jetzt bearbeiten und öffentlich anbieten.',
          timeout: 5000,
        });
        setTimeout(() => {
          this.reload();
        }, 1000);
      });
    } else if (
      this.notificationTitleForPopUp == 'Neue Verknüpfungsanfrage' &&
      this.selectedNotification.notification.freigabeAPI.includes('mitwirkendenverknupfung/Freigabe_Betrieb')
    ) {
      let url = 'services/' + this.selectedNotification.notification.freigabeAPI + this.selectedNotification.notification.dtoID;
      this.notificationService.acceptBetribeVerknpfung(url).subscribe(res => {
        this.showSuccess({
          title: 'Verknüpfung bestätigt',
          msg: 'Ihre Verknüpfungsanfrage wurde bestätigt',
          timeout: 5000,
        });
        setTimeout(() => {
          this.reload();
        }, 1000);
      });
    } else {
      let url = 'services/' + this.selectedNotification.notification.freigabeAPI + this.selectedNotification.notification.dtoID;
      this.notificationService.acceptBetribeVerknpfung(url).subscribe(res => {
        this.showSuccess({ title: 'Verknüpfungsanfrage akzeptiert', msg: 'Verknüpfung als Mitwirkende/r wurde bestätigt', timeout: 5000 });
        setTimeout(() => {
          this.reload();
        }, 1000);
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

  clicknotify() {
    this.shownotify = !this.shownotify;
  }

  clickedInside($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  reload() {
    location.reload();
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onClickBenachrichtigun(i) {
    this.notificationService.updateKalenderbenachrichtigung(this.listOfNotificationBenachrichtigung[i].id, 1).subscribe(res => {
      if (this.router.url.includes('calendar')) {
        location.reload();
      }
    });
  }

  businessconnectionBenachrichtigung(data: string) {
    if (data.includes('bestätigt')) {
      return 'bestätigt';
    } else if (data.includes('abgelehnt')) {
      return 'abgelehnt';
    }
  }

  bellIconClicked() {
    this.listOfNotificationBenachrichtigung.forEach(value => {
      if (value.benachrichtigung_status != 1) {
        this.notificationService.updateKalenderbenachrichtigung(value.id, 1).subscribe(res => {
          value.benachrichtigung_status = 1;
        });
      }
    });
  }

  returnNotReadNotification() {
    return this.listOfNotificationBenachrichtigung.filter(
      value => value.benachrichtigung_status != 1 && value.bps_id != this.aktiveBetId.bpsId
    ).length;
  }

  deleteBenachrichtigungs(id, index) {
    this.calendarService.deleteBenachrichtigungs(id).subscribe(res => {
      this.listOfNotificationBenachrichtigung.splice(index, 1);
    });
  }
}
