import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { DecoderService } from '../services/decoder.service';
import { CanFrame } from '../models/can-frame';
import { CanFrameResult } from '../models/can-frame-result';
// import { Pgn } from '../models/pgn';
// import { Spn, SpnTypes } from '../models/spn';
import { PGNS } from '../models/J1939';


@Component({
  selector : 'app-decoder',
  templateUrl : './decoder.component.html',
  styleUrls : [ './decoder.component.scss' ]
})
export class DecoderComponent implements OnInit {

  @ViewChild('canFrameForm') public canFrameForm: NgForm;

  canFrame: CanFrame = new CanFrame('');
  canFrameResult: CanFrameResult;
  canFrameChange: Subject<string> = new Subject<string>();
  decoderError: string;

  constructor(private decoder: DecoderService) {
    this.decoder.definitions = PGNS;
    this.canFrameChange
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(newStr => this.onChangeComplete(newStr));

    this.canFrame = new CanFrame('0CF00401#FFFF82DF1AFFFFFF');
    this.decode();
  }

  ngOnInit() {
  }

  onChange(text: string) {
    this.decoderError = '';
    this.canFrameChange.next(text);
  }

  onChangeComplete(canFrame: string) {
    console.log(this.canFrameForm);
    this.canFrameResult = undefined;
    if (this.canFrameForm.valid) {
      this.canFrame.value = canFrame;
      this.decode();
    }
  }

  decode() {
    try {
      this.canFrameResult = this.decoder.decode(this.canFrame);
    } catch (e) {
      this.decoderError = e.message;
      console.log(e);
    }
  }

}
