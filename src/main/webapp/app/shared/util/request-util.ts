import {HttpParams} from '@angular/common/http';
import { ListeTerminArt } from '../enum/enum.model';

export interface Pagination {
  page: number;
  size: number;
  sort: string[];
}

export interface Search {
  query: string;
}

export interface SearchWithPagination extends Search, Pagination {}

export const createRequestOption = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();

  if (req) {
    Object.keys(req).forEach(key => {
      if (key !== 'sort') {
        options = options.set(key, req[key]);
      }
    });

    if (req.sort) {
      req.sort.forEach((val: string) => {
        options = options.append('sort', val);
      });
    }
  }
  return options;
};

export const createRequestOptionAbteilung = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(function (key) {
      if(key == 'termin_art') {
        req[key] = ListeTerminArt[req[key]];
      }
      options = options.append(key + '.equals', req[key]);
    });
  }
  return options;
};

export const createRequestOptionMedias = (req?: any): HttpParams => {
  const options: HttpParams = new HttpParams();
  if (req) {
    options.set('id.in', req.ids);
  }
  return options;
};

export const createRequestOptionVerknupfung = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(function (key) {
      options = options.append(key + '.equals', req[key]);
    });
  }
  return options;
};

export const createRequestOptionVertrag = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(function (key) {
      if (key != 'vertragstextContentType') {
        options = options.append(key + '.equals', req[key]);
      } else {
        options = options.append(key + '.notequals', req[key]);
      }
    });
  }
  return options;
};

export const createRequestOptionVerknupfungWithoutEntwürf = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(function (key) {
      options = options.append(key + '.equals', req[key]);
    });
    options = options.append('vertragsstatus.notEquals', 'VERTRAGSENTWURF');
  }
  return options;
};

export const createRequestOptionHistorie = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(key => {
      options = options.append(key + (key == 'betriebId' ? '.in' : '.equals'), req[key]);
    });
  }
  return options;
};

export const createRequestOptionGeneral = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(function (key) {
      options = options.append(key + '.equals', req[key]);
    });
  }
  return options;
};
export const createRequestOptionMitarbeiter = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(function (key) {
      if (key == 'betriebId') {
        options.set('betriebsstatus.in', req.betriebsstatus);
      }
      options = options.append(key + '.equals', req[key]);
    });
  }
  return options;
};

export const createRequestOptionBetriebAdresse = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(function (key) {
      options = options.append(key + '.equals', req[key]);
    });
  }
  return options;
};

export const createRequestOptionGlobalSearch = (req?: any): HttpParams => {
  const options: HttpParams = new HttpParams();
  if (req) {
    options.set('vorname.contains', req.vorname);
    options.set('betriebsname.contains', req.betriebsname);
    options.set('interne_bezeichnung_der_produkts.contains', req.titel);
    options.set('titel.contains', req.werk_titel);
    options.set('spielbezeichnung.contains', req.spiel);
    options.set('betriebsstatus.in', req.betriebsstatus);
  }
  return options;
};
export const createRequestOptionVorlage = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(key => {
      options = options.append(key + (key == 'vorlagenname' ? '.contains' : '.equals'), req[key]);
    });
  }
  return options;
};

export const createRequestOptionBetrieb = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(function (key) {
      options = options.append(key + '.equals', req[key]);
    });
  }
  return options;
};

export const createRequestOptionWerkStatus = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(function (key) {
      options = options.append(key + '.equals', req[key]);
    });
  }
  return options;
};

export const createRequestOptionMitarbeiterBild = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(function (key) {
      options = options.append(key + '.equals', req[key]);
    });
  }
  return options;
};

export const createRequestOptionFaq = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(function (key) {
      options = options.append(key + '.contains', req[key]);
    });
  }
  return options;
};
export const createRequestOptionLiWert = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(function (key) {
      options = options.append(key + '.equals', req[key]);
    });
  }
  return options;
};

export const createRequestBenutzerFavorit = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(function (key) {
      options = options.append(key + '.equals', req[key]);
    });
  }
  return options;
};

export const createRequestProduction = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(function (key) {
      options = options.append(key + '.equals', req[key]);
    });
  }
  return options;
};

export const createRequestAngebot = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(function (key) {
      options = options.append(key + '.equals', req[key]);
    });
  }
  return options;
};

export const createRequestMitwirkend = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(function (key) {
      options = options.append(key + '.equals', req[key]);
    });
  }
  return options;
};

export const createRequestOptionForAll = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(function (key) {
      options = options.append(key + '.equals', req[key]);
    });
  }
  return options;
};
