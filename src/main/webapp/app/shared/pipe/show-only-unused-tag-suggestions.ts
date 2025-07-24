import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'showOnlyUnusedTagSuggestions'
})
@Injectable()
export class ShowOnlyUnusedTagSuggestionsFilter implements PipeTransform {
  transform(liste: any[], tag: any): any {
    let position = liste.map(function (e) { return e.beruf }).indexOf(tag);
    if (position < 0) {
      return true;
    }
    else {
      return false;
      // return liste.filter(item => item.beruf.indexOf(tag) == -1);
    }
  }
}
