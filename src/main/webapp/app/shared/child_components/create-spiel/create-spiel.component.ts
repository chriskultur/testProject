import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Actioncode} from 'app/shared/enum/enum.model';
import {
  SpieladresseDTOListModel,
  SpielkomunikationDTOListModel,
  SpielpartnerDTOListModel,
  Stage
} from 'app/shared/models/stage.model';
import {
  ProdSpielArtDTOListModel,
  ProdSpielLichtpultDTOListModel,
  ProdSpielScheinDTOListModel,
  ProdStageModel,
} from 'app/shared/models/prod-stage.model';
import {SuggestionObject} from 'app/shared/models/suggestionObject';
import {map} from 'rxjs/operators';
import {StageService} from 'app/shared/services/stage.service';
import {Liland} from 'app/shared/models/liland.model';
import {BpBet} from 'app/shared/models/bpBet.model';
import {Betrieb} from 'app/shared/models/betrieb.model';
import {GescheftbDTO, GsbadresseDTOList, GsbkomunikationDTOList} from 'app/shared/models/gescheftbDTO.model';
import {Bp} from 'app/shared/models/bp.model';
import {Listerform} from 'app/shared/models/listerform.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AutoCompleteComponent} from '@syncfusion/ej2-angular-dropdowns';
import {EmitType} from '@syncfusion/ej2-base';
import {FilteringEventArgs} from '@syncfusion/ej2-dropdowns';

@Component({
  selector: 'app-create-spiel',
  templateUrl: './create-spiel.component.html',
  providers: [],
  styleUrls: ['./create-spiel.component.scss'],
})
export class CreateSpielComponent implements OnInit {
  @Input() liland: Array<Liland>;
  @Input() aktivBetrieb: BpBet;
  @Input() bp: Bp;
  @Input() listerform: Listerform[];
  @Input() suggestionArt: SuggestionObject[];
  @Input() eigentumerBetrieb: number;
  @Input() elasticInput: boolean;
  @Output() spielSelected: EventEmitter<any> = new EventEmitter<any>();

  tagOnFocus = false;
  variableArtTagListe: ProdSpielArtDTOListModel[] = [];
  spielMultiModalNew = '';
  testStage: Stage = new Stage(
    '',
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    [
      new SpieladresseDTOListModel(
        Actioncode.create,
        null,
        0,
        0,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ),
    ],
    null,
    [new SpielkomunikationDTOListModel(1, 0, null, 0, null, null)],
    [new SpielpartnerDTOListModel(Actioncode.unchanged)],
    null,
    null,
    null,
    null,
    null,
    0,
    null,
    [],
    null,
    false
  );

  testStageNC: ProdStageModel = new ProdStageModel(
    null,
    null,
    null,
    null,
    0,
    null,
    null,
    null,
    null,
    null,
    null,
    '',
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    [new ProdSpielArtDTOListModel(Actioncode.unchanged, null, null, null)],
    [new ProdSpielLichtpultDTOListModel(Actioncode.unchanged, null, null, null)],
    [new ProdSpielScheinDTOListModel(Actioncode.unchanged, null, null, null, null, null)],
    [],
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    0,
    null,
    null,
    0,
    0,
    null,
    null,
    null,
    null
  );

  public searchStringSpiel: string = null;
  public spielShowResultList: boolean = false;
  eigentumerRadio = '0';
  eigentumerBetId = null;
  companyObjectForSpiel: Betrieb = new Betrieb(
    null,
    null,
    null,
    [],
    null,
    [],
    [],
    null,
    null,
    0,
    0,
    null,
    null,
    null,
    null,
    0,
    0,
    0,
    0,
    2,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    false,
    null,
    true,
    null,
    null,
    null,
    null,
    null,
    null,
    [],
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    0,
    null
  );
  testgescheftb = new GescheftbDTO(
    null,
    null,
    null,
    null,
    null,
    null,
    0,
    [new GsbadresseDTOList(Actioncode.unchanged)],
    [new GsbkomunikationDTOList(Actioncode.unchanged)],
    null,
    null,
    null,
    null,
    null,
    null,
    0
  );
  searching = false;
  public fields: any = { value: 'spielbezeichnung' };
  public data: Observable<Array<any>>;
  public lengthOfResult: number = null;
  public autofill: Boolean = true;
  public highlight: Boolean = true;
  public locale: string = 'de';
  listOfSpielOfAktivBet: Array<Stage> = [];
  spielstatteBezeichnungMatchedInExistingList: boolean = false;
  @ViewChild('spielCreateForm') spielCreateForm: HTMLFormElement;

  constructor(private spielService: StageService, private http: HttpClient) {}

  ngOnInit(): void {
    this.spielService.getSpielWithVerknupfungFIlterAll(this.aktivBetrieb.betriebsId).subscribe(spiel => {
      this.listOfSpielOfAktivBet = spiel;
    });
  }

  public getData(remote: AutoCompleteComponent, text: string): Observable<any> {
    let params = new HttpParams().set('spielbezeichnung.contains', text);
    return this.http.get('services/bettab/api/V1/betriebe/Spielstaetten/all', { params: params }).pipe(
      map((data: Array<any>) => {
        this.lengthOfResult = data.length;
        if (data.length != 0) {
          remote.hidePopup();
          setTimeout(() => remote.showPopup(), 500);
        } else {
          remote.hidePopup();
        }
        return data;
      })
    );
  }

  public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs, remote: AutoCompleteComponent) => {
    this.spielMultiModalNew = e.text;
    if (e.text.length >= 2) {
      this.data = this.getData(remote, e.text);
      e.preventDefaultAction = true;
    } else {
      e.cancel = true;
    }
    this.spielstatteBezeichnungMatchedInExistingList = false;
  };

  getLandName(id) {
    return this.liland.filter(value => value.id == id)[0].bezeichnung;
  }

  onTagFocus(validate: boolean, type?: string) {
    if (type == 'art') {
      this.tagOnFocus = validate;
    }
  }

  public onAddTag(item, type: string) {
    if (type == 'art') {
      let topush = {
        actioncode: Actioncode.create,
        bezeichnung: item.value,
        id: null,
        prodSpielsId: this.testStageNC.id,
      };
      if (this.testStageNC.prodSpielArtDTOList.filter(value => value.bezeichnung == item.value).length == 0) {
        this.testStageNC.prodSpielArtDTOList.push(topush);
      } else {
        if (this.testStageNC.prodSpielArtDTOList.filter(value => value.bezeichnung == item.value)[0].id != null) {
          this.testStageNC.prodSpielArtDTOList.filter(value => value.bezeichnung == item.value)[0].actioncode = Actioncode.unchanged;
        }
      }
      if (this.variableArtTagListe.filter(value => value.bezeichnung == item.value).length == 0) {
        this.variableArtTagListe.push(topush);
      }
    }
  }

  public onRemoveTag(item, type: String) {
    if (type == 'art') {
      let index = this.testStageNC.prodSpielArtDTOList.findIndex(value => value.bezeichnung == item.bezeichnung);
      if (this.testStageNC.prodSpielArtDTOList[index].id != null) {
        this.testStageNC.prodSpielArtDTOList[index].actioncode = Actioncode.delete;
      } else {
        this.testStageNC.prodSpielArtDTOList[index].actioncode = Actioncode.delete;
        this.testStageNC.prodSpielArtDTOList.splice(index, 1);
      }
    }
  }

  public onAddSuggestionTag(item, type: string) {
    if (type == 'art') {
      let topush = {
        actioncode: Actioncode.create,
        bezeichnung: item,
        id: null,
        prodSpielsId: this.testStageNC.id,
      };
      if (this.testStageNC.prodSpielArtDTOList.filter(value => value.bezeichnung == item).length == 0) {
        this.testStageNC.prodSpielArtDTOList.push(topush);
      } else {
        /*if user add saved tag again then need to change the actioncode*/
        if (this.testStageNC.prodSpielArtDTOList.filter(value => value.bezeichnung == item)[0].id != null) {
          this.testStageNC.prodSpielArtDTOList.filter(value => value.bezeichnung == item)[0].actioncode = Actioncode.unchanged;
        }
      }
      if (this.variableArtTagListe.filter(value => value.bezeichnung == item).length == 0) {
        this.variableArtTagListe.push(topush);
      }
    }
  }

  createStage() {
    if (this.eigentumerBetrieb == this.aktivBetrieb.betriebsId) {
      this.testStage.betriebsId = this.aktivBetrieb.betriebsId;
      this.testStage.verwaltungBetriebId = null;
      this.testStageNC.betriebsId = this.aktivBetrieb.betriebsId;
    } else {
      this.testStage.betriebsId = this.eigentumerBetrieb;
      this.testStage.verwaltungBetriebId = this.aktivBetrieb.betriebsId;
      this.testStageNC.betriebsId = this.eigentumerBetrieb;
    }
    this.testStage.secondary_betrieb_id = this.aktivBetrieb.betriebsId;
    this.testStage.spielbezeichnung = this.spielMultiModalNew;
    if (this.eigentumerRadio != null) {
      this.testStage.status = 'spielstätte_freigegeben';
    }

    if (this.testStage.id == null) {
      this.spielService.createStage(this.testStage).subscribe((responseSpiel: Stage) => {
        this.testStage = responseSpiel;
        this.testStageNC.spielssId = responseSpiel.id;
        this.testStageNC.interne_bezeichnung_der_produkts = this.testStage.spielbezeichnung;
        this.spielService.createProduktStage(this.testStageNC).subscribe((responseProdSpiel: ProdStageModel) => {
          this.testStageNC = responseProdSpiel;

          this.spielSelectedMultiModal(this.testStage, 'create');
        });
      });
    } else {
      this.spielService.updateStage(this.testStage).subscribe((responseSpiel: Stage) => {
        this.testStage = responseSpiel;
        this.testStageNC.spielssId = responseSpiel.id;
        this.testStageNC.interne_bezeichnung_der_produkts = this.testStage.spielbezeichnung;
        this.spielService.updateProduktStage(this.testStageNC).subscribe((responseProdSpiel: ProdStageModel) => {
          this.testStageNC = responseProdSpiel;

          this.spielSelectedMultiModal(this.testStage, 'create');
        });
      });
    }
  }

  spielSelectedMultiModal(data, tp) {
    this.spielShowResultList = false;
    if (tp == 'create') {
      this.spielSelected.emit({ data: data, tp: tp });
    }
  }

  selectedBetForEigentumer(item: any) {
    this.testStage.verwaltungBetriebId = item.id;
    this.companyObjectForSpiel = item;
  }

  selectedSpiel(data) {
    this.lengthOfResult = null;
    this.spielShowResultList = false;
    this.spielstatteBezeichnungMatchedInExistingList = false;
    this.spielMultiModalNew = null;

    this.spielSelected.emit({ data: data.itemData, tp: 'create' });
  }

  spielNameValidationTest() {
    if (!this.spielShowResultList && this.spielMultiModalNew != '' && this.spielMultiModalNew != null) {
      let temp = this.listOfSpielOfAktivBet.filter(
        value => value.spielbezeichnung.trim().toLowerCase() == this.spielMultiModalNew.trim().toLowerCase()
      );

      if (temp.length != 0) {
        this.spielstatteBezeichnungMatchedInExistingList = true;
        this.spielShowResultList = false;
        this.spielCreateForm.controls['name_stage'].setErrors({ incorrect: true });
      } else {
        this.spielShowResultList = this.lengthOfResult != 0;
      }
    }
  }

  resetObject() {
    this.companyObjectForSpiel = new Betrieb(
      null,
      null,
      null,
      [],
      null,
      [],
      [],
      null,
      null,
      0,
      0,
      null,
      null,
      null,
      null,
      0,
      0,
      0,
      0,
      2,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      false,
      null,
      true,
      null,
      null,
      null,
      null,
      null,
      null,
      [],
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      0,
      null
    );
  }
}
