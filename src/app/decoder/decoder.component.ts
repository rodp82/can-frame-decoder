import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { DecoderService } from '../services/decoder.service';
import { CanFrame } from '../models/can-frame';
import { CanFrameResult } from '../models/can-frame-result';
import { Pgn, Spn } from '../models/pgn';


@Component({
  selector : 'app-decoder',
  templateUrl : './decoder.component.html',
  styleUrls : [ './decoder.component.scss' ]
})
export class DecoderComponent implements OnInit {

  canFrame: CanFrame;
  canFrameResult: CanFrameResult;
  canFrameChange: Subject<string> = new Subject<string>();

  pgns = {
    61442 : new Pgn (61442, 'Electronic Transmission Controller 1', 8, '10 ms', 'ETC1', [
      new Spn( 560, 'Transmission Driveline Engaged', '', '1.1', 2, '4 states/2 bit', 0, 'bit'),
      new Spn( 573, 'Transmission Torque Converter Lockup Engaged', '', '1.3', 2, '4 states/2 bit', 0, 'bit'),
      new Spn( 574, 'Transmission Shift In Process', '', '1.5', 2, '4 states/2 bit', 0, 'bit'),
      new Spn( 191, 'Transmission Output Shaft Speed', '', '2-3', 16, '0.125 rpm/bit', 0, 'rpm'),
      new Spn( 522, 'Percent Clutch Slip', '', '4', 8, '0.4 %/bit', 0, '%'),
      new Spn( 606, 'Engine Momentary Overspeed Enable', '', '5.1', 2, '4 states/2 bit', 0, 'bit'),
      new Spn( 607, 'Progressive Shift Disable', '', '5.3', 2, '4 states/2 bit', 0, 'bit'),
      new Spn( 161, 'Transmission Input Shaft Speed', '', '6-7', 16, '0.125 rpm/bit', 0, 'rpm'),
      new Spn( 1482, 'Source Address of Controlling Device for Transmission Control', '', '8', 8, '1 source address/bit', 0, 'SA'),
    ] ),
    61444 : new Pgn(61444, 'Electronic Engine Controller 1', 8, 'Engine speed dependent', 'EEC1', [
      new Spn(899, 'Engine Torque Mode', '', '1.1', 4, '16 states/4 bit', 0, 'bit'),
      new Spn(4154, 'Actual Engine - Percent Torque High Resolution', '', '1.5', 4, '0.125%/bit', 0, '%'),
      new Spn(512, 'Driver\'s Demand Engine - Percent Torque', '', '2', 8, '1 %/bit', -125, '%'),
      new Spn(513, 'Actual Engine - Percent Torque', '', '3', 8, '1 %/bit', -125, '%'),
      new Spn(190, 'Engine Speed', '', '4-5', 16, '0.125 rpm/bit', 0, 'rpm'),
      new Spn(1483, 'Source Address of Controlling Device for Engine Control', '', '6', 8, '1 source address/bit', 0, 'SA'),
      new Spn(1675, 'Engine Starter Mode', '', '7.1', 4, '16 states/4 bit', 0, 'bit'),
      new Spn(2432, 'Engine Demand – Percent Torque', '', '8', 8, '1 %/bit', -125, '%'),
    ])
  };

  constructor(private decoder: DecoderService) {
    this.decoder.definitions = this.pgns;
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
    this.canFrameChange.next(text);
  }

  onChangeComplete(canFrame: string) {
    this.canFrame.value = canFrame;
    this.decode();
  }

  decode() {
    try {
      this.canFrameResult = this.decoder.decode(this.canFrame);
    } catch (e) {
      console.log(e);
    }
  }

}
