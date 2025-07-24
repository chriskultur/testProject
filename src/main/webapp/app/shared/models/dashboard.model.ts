
export class DashboardModel {
  constructor(
    public aktBetrieb?: boolean,
    public aktiv?: boolean,
    public aufgaben?: number,
    public email?: string,
    public nachricht?: number,
    public name?: string,
    public neuigkeiten?: number,
    public voll?: boolean
  ) {}
}

export class StatusUserDelete {
  constructor(
    public aktiv?: boolean,
    public deaktivGrund?: string
  ) {
  }
}
