export class VerlagBuchunListModel {
  constructor(
    public anbieter_Betrieb_id?: number,
    public anbieter_Betriewb_Name?: string,
    public datum?: any,
    public preisangabe?: string,
    public produktion_id?: number,
    public produktion_name?: string,
    public veranstalter_Betrieb_Name?: string,
    public veranstalter_Betrieb_id?: number,
    public werk_ID?: number,
    public termin_von?: string,
    public termin_bis?: string,
    public angebot_bezeichnung?: string,
    public auffuhrungsort?: string
  ) {}
}
