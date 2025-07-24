import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {messageTemplate} from 'app/shared/models/anbahnung.model';
import {CalendarService} from 'app/shared/services/calendar.service';
import {BpBet} from 'app/shared/models/bpBet.model';

@Component({
  selector: 'app-message-template',
  templateUrl: './message-template.component.html',
  styleUrls: ['./message-template.component.scss'],
})
export class MessageTemplateComponent implements OnInit, OnChanges {
  public isCollapsedTemplate = false;
  public isCollapsedTemplate2 = false;
  messageTemplateTitle = null;
  messageTemplateList: Array<messageTemplate> = [];
  @Input() aktivBetrieb: BpBet;
  @Input() text;
  @Input() templatetype:string;
  @Output() selectedMessage: EventEmitter<string> = new EventEmitter<string>();

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    if (this.aktivBetrieb && this.aktivBetrieb.id != null) this.loadMessageTemplate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['aktivbetrieb']) {
      this.aktivBetrieb = <BpBet>changes['aktivbetrieb'].currentValue;
      this.loadMessageTemplate();
    }
  }

  saveMessageTemplate() {
    let Obj: messageTemplate = new messageTemplate(this.aktivBetrieb.betriebsId, this.text, this.messageTemplateTitle, null,this.templatetype.includes("contract")?1:0);
    this.calendarService.createMessageTemptate(Obj).subscribe(res => {
      this.messageTemplateList.push(res);
      this.messageTemplateTitle = null;
    });
  }

  loadMessageTemplate() {
    const vorlageArt = this.templatetype.includes("contract")?1:0;
    this.calendarService.getAllMessageTemptate(this.aktivBetrieb.betriebsId,vorlageArt).subscribe(res => {
      this.messageTemplateList = res;
    });
  }

  messageTemplateSelected(text) {
    this.selectedMessage.emit(text);
  }

  deleteMessageTemplate(i) {
    this.calendarService.deleteMessageTemptate(i).subscribe(res => {
      this.loadMessageTemplate();
    });
  }

  trackByIndex(i: number) {
    return i;
  }
}
