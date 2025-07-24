import {Injectable} from '@angular/core';

import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {
  AlleFavoriten,
  Favorit_benutzer,
  Favorit_produktion,
  Favorit_spiel,
  Favorit_werk
} from 'app/shared/models/favorit_model';
import {createRequestBenutzerFavorit} from 'app/shared/util/request-util';
import {map} from 'rxjs/operators';
import {prodKunstFavorit} from 'app/shared/models/kunstler-produkt.model';

@Injectable()
export class FavoritService {
  private prodtab_favorit = 'services/prodtab/api/V1/Benutzer/Favorit/Produktion';
  private werktab_favorit = 'services/prodtab/api/V1/Benutzer/Favorit/Werk';
  private alle_favorite = 'services/prodtab/api/V1/benutzer/favoriten';
  private spieltab_favorite = 'services/prodtab/api/V1/Benutzer/Favorit/Spielstatte';
  private benutzer_favorite = 'services/bptab/api/V1/benutzer/favorit';
  private benutzer_favorite_alle = 'services/bptab/api/V1/benutzer/favorit/all';
  public kunstlerBetriebFavorit = 'services/prodtab/api/V1/Produktion/Kunstler/Favorit';

  constructor(private http: HttpClient) {}

  create_produktion_favorit(favorit: Favorit_produktion): Observable<Favorit_produktion> {
    const copy = this.convert(favorit);
    return this.http.post(this.prodtab_favorit, copy, { observe: 'response' }).pipe(
      map((res: HttpResponse<Favorit_produktion>) => {
        return res.body;
      })
    );
  }

  find_produktion_favorit(req): Observable<Favorit_produktion[]> {
    const options = createRequestBenutzerFavorit(req);
    return this.http
      .get(this.prodtab_favorit, {
        params: options,
        observe: 'response',
      })
      .pipe(
        map((res: HttpResponse<Favorit_produktion[]>) => {
          return res.body;
        })
      );
  }

  delete_produktion_favorit(id: number): Observable<Favorit_produktion> {
    return this.http.delete(`${this.prodtab_favorit}/${id}`, { observe: 'response' }).pipe(
      map((res: HttpResponse<Favorit_produktion>) => {
        return res.body;
      })
    );
  }

  create_werk_favorit(favorit: Favorit_werk): Observable<Favorit_werk> {
    const copy = this.convert(favorit);
    return this.http.post(this.werktab_favorit, copy, { observe: 'response' }).pipe(
      map((res: HttpResponse<Favorit_werk>) => {
        return res.body;
      })
    );
  }

  find_werk_favorit(req): Observable<Favorit_werk[]> {
    const options = createRequestBenutzerFavorit(req);
    return this.http
      .get(this.werktab_favorit, {
        params: options,
        observe: 'response',
      })
      .pipe(
        map((res: HttpResponse<Favorit_werk[]>) => {
          return res.body;
        })
      );
  }

  delete_werk_favorit(id: number): Observable<Favorit_werk> {
    return this.http.delete(`${this.werktab_favorit}/${id}`, { observe: 'response' }).pipe(
      map((res: HttpResponse<Favorit_werk>) => {
        return res.body;
      })
    );
  }

  create_spiel_favorit(favorit: Favorit_werk): Observable<Favorit_spiel> {
    const copy = this.convert(favorit);
    return this.http
      .post(this.spieltab_favorite, copy, {
        observe: 'response',
      })
      .pipe(
        map((res: HttpResponse<Favorit_spiel>) => {
          return res.body;
        })
      );
  }

  find_spiel_favorit(req): Observable<Favorit_spiel[]> {
    const options = createRequestBenutzerFavorit(req);
    return this.http
      .get(this.spieltab_favorite, {
        params: options,
        observe: 'response',
      })
      .pipe(
        map((res: HttpResponse<Favorit_spiel[]>) => {
          return res.body;
        })
      );
  }

  delete_spiel_favorit(id: number): Observable<Favorit_spiel> {
    return this.http.delete(`${this.spieltab_favorite}/${id}`, { observe: 'response' }).pipe(
      map((res: HttpResponse<Favorit_spiel>) => {
        return res.body;
      })
    );
  }

  find_alle_favorit(bpid: number): Observable<AlleFavoriten[]> {
    return this.http.get(`${this.alle_favorite}/${bpid}`, { observe: 'response' }).pipe(
      map((res: HttpResponse<AlleFavoriten[]>) => {
        return res.body;
      })
    );
  }

  create_benutzer_favorit(favorit: Favorit_benutzer): Observable<Favorit_benutzer> {
    const copy = this.convert(favorit);
    return this.http
      .post(this.benutzer_favorite, copy, {
        observe: 'response',
      })
      .pipe(
        map((res: HttpResponse<Favorit_benutzer>) => {
          return res.body;
        })
      );
  }

  find_benutzer_favorit(req?: any): Observable<Favorit_benutzer[]> {
    const options = createRequestBenutzerFavorit(req);
    return this.http
      .get(this.benutzer_favorite_alle, {
        params: options,
        observe: 'response',
      })
      .pipe(
        map((res: HttpResponse<Favorit_benutzer[]>) => {
          return res.body;
        })
      );
  }

  // +'&bp_favoritId.equals='+favoritid
  delete_benutzer_favorit(id: number): Observable<Favorit_benutzer> {
    return this.http.delete(`${this.benutzer_favorite}/${id}`, { observe: 'response' }).pipe(
      map((res: HttpResponse<Favorit_benutzer>) => {
        return res.body;
      })
    );
  }

  /**
   * Convert a Bpberuf to a JSON which can be sent to the server.
   */
  private convert(object: any): any {
    const copy: any = Object.assign({}, object);
    return copy;
  }

  postKunstlerProduktFavorit(body: prodKunstFavorit) {
    return this.http
      .post(this.kunstlerBetriebFavorit, body, { observe: 'response' })
      .pipe(map((res: HttpResponse<prodKunstFavorit>) => res.body));
  }

  getKunstlerProduktFavoritWithProdKunstId(prodKunstId: number, bpid:number) {
    return this.http
      .get(this.kunstlerBetriebFavorit + '?prodKunstId.equals=' + prodKunstId + '&bpId.equals=' + bpid, { observe: 'response' })
      .pipe(map((res: HttpResponse<prodKunstFavorit[]>) => res.body));
  }

  deleteKunstlerProduktFavorit(id: number) {
    return this.http
      .delete(this.kunstlerBetriebFavorit + '/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<prodKunstFavorit>) => res.body));
  }
}
