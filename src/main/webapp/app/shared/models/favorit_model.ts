export class Favorit_produktion {
  constructor(
    public id?: number,
    public bemerknug?: string,
    public bpId?: number,
    public datum?: any,
    public prodProdId?: number,
    public reihenfolge?: number
  ) {}
}

export class Favorit_werk {
  constructor(
    public id?: number,
    public bemerknug?: string,
    public bpId?: number,
    public datum?: any,
    public prodWerkId?: number,
    public reihenfolge?: number
  ) {}
}

export class Favorit_spiel {
  constructor(
    public id?: number,
    public bemerknug?: string,
    public bpId?: number,
    public datum?: any,
    public spiel_favoritId?: number,
    public reihenfolge?: number
  ) {}
}

export class Favorit_benutzer {
  constructor(
    public id?: number,
    public bemerknug?: string,
    public bpId?: number,
    public datum?: any,
    public bp_favoritId?: number,
    public reihenfolge?: number
  ) {}
}

export class AlleFavoriten {
  constructor(
    public betrieb_id?: number,
    public betrieb_name?: string,
    public favorit_art?: number,
    public favorit_objekt_bezeichnung?: string,
    public favorit_objekt_id?: number,
    public favorits_id?: number,
    public betrieb_typ?: number,
    public spiels_id?: number,
    public klickbar?: string
  ) {}
}
