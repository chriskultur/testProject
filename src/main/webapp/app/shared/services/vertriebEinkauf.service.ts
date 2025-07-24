import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map, sample} from 'rxjs/operators';
import {VertriebEinkaufListModel} from 'app/shared/models/vertriebEinkaufList.model';
import {Contract, ContractRaw} from "../models/contract.model";
import {Observable} from "rxjs";
import {Bp} from "../models/bp.model";

@Injectable()
export class VertriebEinkaufService {
  private prodVertriebEinkaufList = 'services/opttab/api/V1/vetrieb/einkauf/';

  constructor(private http: HttpClient) {}

  getProdVertriebEinkaufList(id: number) {
    return this.http
      .get(this.prodVertriebEinkaufList + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<VertriebEinkaufListModel[]>) => res.body));
  }



  private enumLabels = [
    'vertragsentwurf', 'In Bearbeitung (Anleger)', 'In Bearbeitung (Freigeber)',
    'Freigabe beantragt (durch Anleger)', 'Freigabe beantragt (durch Freigeber)',
    'Vertrag geschlossen', 'Vertrag Abgelehnt', 'Buchung ohne Vertrag'
  ];
  fetchContracts(betriebId: number = 1): Observable<ContractRaw[]> {
    return this.http.get<ContractRaw[]>(`${this.prodVertriebEinkaufList}${betriebId}`);
  }
  transform(raw: ContractRaw[], betriebId: number ,bp: Bp): Contract[] {
    const groups = new Map<string, ContractRaw[]>();
    raw.forEach(r => {
      const key = String(r.anba_id);
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(r);
    });
    const result: Contract[] = [];
    groups.forEach(list => {
      const dates = Array.from(new Set(list.map(r => r.datum_von.split(',')[0].trim())))
        .sort((a,b)=> {
          const da=a.split('.').reverse().join('-'), db=b.split('.').reverse().join('-');
          return da<db?-1:da>db?1:0;
        });


      const sample = list[0];
      let partner = '';
      let partnerEmail = '';
      let partnerPhone = '';
      let adresse = '';
      let bpid = null;
      let bpname = '';
      if (sample.created_benutzer_id == bp.id) {
        bpid = bp.id;
        bpname = bp.vorname + ' ' + bp.nachname;
      } else {
        bpid = sample.created_benutzer_id;
        bpname = sample.created_benutzer_Name;
      }
      if (betriebId === sample.anbieter_betrieb_id) {
        partner = sample.veranstalter_betrieb_betriebsname;
        partnerEmail = sample.veranstalter_betrieb_email;
        partnerPhone = sample.veranstalter_betrieb_telefon;
        adresse = `${sample.veranstalter_betrieb_strasse}, ${sample.veranstalter_betrieb_plz} ${sample.veranstalter_betrieb_stadt}`;
      } else if (betriebId === sample.veranstalter_betrieb_id) {
        partner = sample.anbieter_betrieb_betriebsname;
        partnerEmail = sample.anbieter_betrieb_email;
        partnerPhone = sample.anbieter_betrieb_telefon;
        adresse = `${sample.anbieter_betrieb_strasse}, ${sample.anbieter_betrieb_plz} ${sample.anbieter_betrieb_stadt}`;
      }
      let statusLabel = '';

      const isBookingWithoutContract =
          (sample.termin_typ === 4 && sample.termin_art === 2 && sample.buch_vertrag_status === null) ||
          (sample.termin_typ === 3 && sample.termin_art === 4) ||
          (sample.termin_typ === 5 && sample.buch_vertrag_status === null) ||
          (sample.buch_vertrag_status === 0 && (sample.vertrag_status === 1 || sample.vertrag_status === 0));

      if (isBookingWithoutContract) {
        statusLabel = 'Buchung ohne Vertrag';
      } else {
        statusLabel = sample.buch_vertrag_status !== null ? this.enumLabels[sample.buch_vertrag_status] : '';
      }
      const terminArt = list.some(r => r.termin_art === 4) ? 4 : sample.termin_art;
      result.push({
        vertrag_art: sample.vertrag_art,
        storno_status: sample.storno_status,
        buch_vertrag_ID: sample.buch_vertrag_ID,
        buch_vertrag_status: sample.buch_vertrag_status,
        statusLabel: statusLabel,
        produktname: sample.produktname,
        datumsListe: dates.join(', '),
        spielort_Stadt: sample.spielort_Stadt,
        vertragspartner: partner,
        anbieterId: sample.anbieter_betrieb_id,
        prodProdsId: sample.prodprod_id,
        partnerEmail: partnerEmail,
        partnerPhone: partnerPhone,
        adresse: adresse,
        id: sample.buch_id,
        image: null,
        loadingImage: false,
        vertrag_anleger_betrieb_id: sample.vertrag_anleger_betrieb_id,
        vertrag_freigabe_betrieb_id: sample.vertrag_freigabe_betrieb_id,
        termin_art : terminArt,
        termin_typ : sample.termin_typ,
        vertrag_status : sample.vertrag_status,
        benutzerId : bpid,
        benutzerName : bpname,
        buch_nachtrag_id : sample.buch_nachtrag_id,
        abko_termin_id: sample.abko_termin_id,
        dateUhrList: list.map(r => {
          try {
            const [date, time] = (r.datum_von || '').split(' ');
            if (!date) return null;

            const [day, month, year] = date.trim().split('.');
            const [hours, minutes] = (time || '00:00').split(':');

            // Validate the parts
            if (!day || !month || !year) return null;

            const dateObj = new Date(
              parseInt(year),
              parseInt(month) - 1,
              parseInt(day),
              parseInt(hours || '0'),
              parseInt(minutes || '0')
            );

            // Validate the date
            return dateObj.toString() === 'Invalid Date' ? null : dateObj;
          } catch (e) {
            console.error('Date parsing error:', e, 'for datum_von:', r.datum_von);
            return null;
          }
        }).filter(date => date !== null) // Remove null values
          .sort((a, b) => a!.getTime() - b!.getTime())
      });
    });
    return result;
  }
}
