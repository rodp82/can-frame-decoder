import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Component({
  selector : 'app-decoder',
  templateUrl : './decoder.component.html',
  styleUrls : [ './decoder.component.scss' ]
})
export class DecoderComponent implements OnInit {

  canFrame: string = '0CF00401#FFFF82DF1AFFFFFF';
  canFrameChange: Subject<string> = new Subject<string>();

  pgns = {
    61442 : {
      name : 'Electronic Transmission Controller 1',
      acronym : 'ETC1',
      spns : []
    }
  };

  constructor() {
    this.canFrameChange
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(newStr => this.decode(newStr));
  }

  ngOnInit() {
  }

  onChange(text: string) {
    this.canFrameChange.next(text);
  }

  decode(canFrame: string) {
    this.canFrame = canFrame;
  }

}
