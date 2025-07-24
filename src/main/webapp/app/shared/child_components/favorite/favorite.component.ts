import {Component, Input, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {BpBetVerknupfungService} from 'app/shared/services/bpBetVerknupfung.service';
import {FavoritService} from 'app/shared/services/favorit_service';
import {ToastService} from 'app/shared/services/toast.service';
import {Favorit_benutzer} from 'app/shared/models/favorit_model';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FavoriteComponent implements OnInit, OnChanges {
  position = 'bottom-right';
  title: string;
  msg: string;
  showClose = true;
  timeout = 10000;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;
  isFavorite: boolean;
  @Input() favorit: any;
  @Input() favorit_type: string;

  constructor(
    private favorit_service: FavoritService,
    private bpbetverknupfungService: BpBetVerknupfungService,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.favorit.id == null) {
      this.isFavorite = false;
    } else {
      this.isFavorite = true;
    }
  }

  onClick() {
    this.isFavorite = !this.isFavorite;
    if (this.favorit_type == 'produktion') {
      if (this.isFavorite) {
        this.favorit_service.create_produktion_favorit(this.favorit).subscribe((favorit: any) => {
          this.favorit.id = favorit.id;
        });
        this.addToast({
          title: 'Favorit gespeichert!',
          msg: 'Diesen Eintrag finden Sie jetzt auf Ihrer Favoritenliste',
          timeout: 10000,
          theme: 'bootstrap',
          position: 'bottom-right',
          type: 'success',
        });
      } else {
        this.favorit_service.delete_produktion_favorit(this.favorit.id).subscribe(() => {
          this.favorit.id = null;
        });
        this.favorit.id = null;
        this.addToast({
          title: 'Favorit entfernt!',
          msg: 'Der Eintrag wurde von Ihrer Favoritenliste entfernt',
          timeout: 10000,
          theme: 'bootstrap',
          position: 'bottom-right',
          type: 'info',
        });
      }
    } else if (this.favorit_type == 'werk') {
      if (this.isFavorite) {
        this.favorit_service.create_werk_favorit(this.favorit).subscribe((favorit: any) => {
          this.favorit.id = favorit.id;
        });
        this.addToast({
          title: 'Favorit gespeichert!',
          msg: 'Diesen Eintrag finden Sie jetzt auf Ihrer Favoritenliste',
          timeout: 10000,
          theme: 'bootstrap',
          position: 'bottom-right',
          type: 'success',
        });
      } else {
        this.favorit_service.delete_werk_favorit(this.favorit.id).subscribe(() => {
          this.favorit.id = null;
        });
        this.favorit.id = null;
        this.addToast({
          title: 'Favorit entfernt!',
          msg: 'Der Eintrag wurde von Ihrer Favoritenliste entfernt',
          timeout: 10000,
          theme: 'bootstrap',
          position: 'bottom-right',
          type: 'info',
        });
      }
    } else if (this.favorit_type == 'betrieb') {
      if (this.isFavorite) {
        this.bpbetverknupfungService.createFavorit(this.favorit).subscribe((favorit: any) => {
          this.favorit.id = favorit.id;
        });
        this.addToast({
          title: 'Favorit gespeichert!',
          msg: 'Diesen Eintrag finden Sie jetzt auf Ihrer Favoritenliste',
          timeout: 10000,
          theme: 'bootstrap',
          position: 'bottom-right',
          type: 'success',
        });
      } else {
        this.bpbetverknupfungService.deleteFavorit(this.favorit.id).subscribe(() => {
          this.favorit.id = null;
        });
        this.favorit.id = null;
        this.addToast({
          title: 'Favorit entfernt!',
          msg: 'Der Eintrag wurde von Ihrer Favoritenliste entfernt',
          timeout: 10000,
          theme: 'bootstrap',
          position: 'bottom-right',
          type: 'info',
        });
      }
    } else if (this.favorit_type == 'spiel') {
      if (this.isFavorite) {
        this.favorit_service.create_spiel_favorit(this.favorit).subscribe((favorit: any) => {
          this.favorit.id = favorit.id;
        });
        this.addToast({
          title: 'Favorit gespeichert!',
          msg: 'Diesen Eintrag finden Sie jetzt auf Ihrer Favoritenliste',
          timeout: 10000,
          theme: 'bootstrap',
          position: 'bottom-right',
          type: 'success',
        });
      } else {
        this.favorit_service.delete_spiel_favorit(this.favorit.id).subscribe(() => {
          this.favorit.id = null;
        });
        this.favorit.id = null;
        this.addToast({
          title: 'Favorit entfernt!',
          msg: 'Der Eintrag wurde von Ihrer Favoritenliste entfernt',
          timeout: 10000,
          theme: 'bootstrap',
          position: 'bottom-right',
          type: 'info',
        });
      }
    } else if (this.favorit_type == 'benutzer') {
      if (this.isFavorite) {
        this.favorit_service.create_benutzer_favorit(this.favorit).subscribe((favorit: Favorit_benutzer) => {
          this.favorit.id = favorit.id;
        });
        this.addToast({
          title: 'Favorit gespeichert!',
          msg: 'Diesen Eintrag finden Sie jetzt auf Ihrer Favoritenliste',
          timeout: 10000,
          theme: 'bootstrap',
          position: 'bottom-right',
          type: 'success',
        });
      } else {
        this.favorit_service.delete_benutzer_favorit(this.favorit.id).subscribe(() => {
          this.favorit.id = null;
        });
        this.favorit.id = null;
        this.addToast({
          title: 'Favorit entfernt!',
          msg: 'Der Eintrag wurde von Ihrer Favoritenliste entfernt',
          timeout: 10000,
          theme: 'bootstrap',
          position: 'bottom-right',
          type: 'info',
        });
      }
    } else if (this.favorit_type == 'kunstlerBetrieb') {
      if (this.isFavorite) {
        this.favorit_service.postKunstlerProduktFavorit(this.favorit).subscribe((favorit: Favorit_benutzer) => {
          this.favorit.id = favorit.id;
        });
        this.addToast({
          title: 'Favorit gespeichert!',
          msg: 'Diesen Eintrag finden Sie jetzt auf Ihrer Favoritenliste',
          timeout: 10000,
          theme: 'bootstrap',
          position: 'bottom-right',
          type: 'success',
        });
      } else {
        this.favorit_service.deleteKunstlerProduktFavorit(this.favorit.id).subscribe(() => {
          this.favorit.id = null;
        });
        this.favorit.id = null;
        this.addToast({
          title: 'Favorit entfernt!',
          msg: 'Der Eintrag wurde von Ihrer Favoritenliste entfernt',
          timeout: 10000,
          theme: 'bootstrap',
          position: 'bottom-right',
          type: 'info',
        });
      }
    }
  }

  addToast(options) {
    if (options.type == 'success') {
      this.toastService.show(options.msg, {
        classname: 'bg-success',
        delay: 2000,
        autohide: true,
        headertext: options.title,
      });
    } else if (options.type == 'info') {
      this.toastService.show(options.msg, {
        classname: 'bg-info text-light',
        delay: 2000,
        autohide: true,
        headertext: options.title,
      });
    }
  }
}
