import {Injectable} from '@angular/core';
import {BpBet} from "app/shared/models/bpBet.model";
import {BpBetService} from "app/shared/services/bpBet.service";
import {Bp} from "app/shared/models/bp.model";
import {BpService} from "app/shared/services/bp.service";
import {ReplaySubject} from "rxjs";
import {Liland} from "app/shared/models/liland.model";
import {sortSuggestion} from "app/shared/util/sort-util";
import {LilandService_bp} from "app/shared/services/liland-bp.service";

@Injectable()
export class GlobalVariableService {

  private aktivBetriebSource = new ReplaySubject<BpBet>(null);
  private bpSource = new ReplaySubject<Bp>(null);
  private landSource = new ReplaySubject<Liland[]>(null);
  public aktivBetrieb = this.aktivBetriebSource.asObservable();
  public bp = this.bpSource.asObservable();
  public liLand = this.landSource.asObservable();

  constructor(private aktivBetService: BpBetService,
              private bpService: BpService,
              private landService: LilandService_bp) {

    this.bpService.find().subscribe((bp: Bp) => {
      this.bpSource.next(bp);
      this.setAktivBetrieb(bp.id);
    });

    this.landService.query().subscribe((land: Liland[]) => {
      this.landSource.next(sortSuggestion(land));
    });

  }

  setAktivBetrieb(bpId: number){
    this.aktivBetService
      .query({
        bpsId: bpId,
      })
      .subscribe((response: BpBet[]) => {
        if (response.length != 0) {
          this.aktivBetriebSource.next(response[0]);
        }
      });
  }

}
