import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector    : 'app-decoder',
  templateUrl : './decoder.component.html',
  styleUrls   : [ './decoder.component.scss' ]
})
export class DecoderComponent implements OnInit {

  canFrame: string                = '';
  canFrameChange: Subject<string> = new Subject<string>();

  pgns = {
    61442 : {
      name    : 'Electronic Transmission Controller 1',
      acronym : 'ETC1',
      spns    : []
    }
  };

  constructor() {
    this.canFrame = '0CF00401#FFFF82DF1AFFFFFF';
    this.canFrameChange
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(this.decode);
  }

  ngOnInit() {
  }

  onChange(text: string) {
    console.log('changing');
    this.canFrameChange.next(text);
  }

  decode(canFrame: string) {
    console.log('changed');
    this.canFrame = canFrame;

  }


}
