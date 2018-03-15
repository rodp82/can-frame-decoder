import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { CanFrame } from '../models/can-frame';
import { CanFrameResult } from '../models/can-frame-result';

@Injectable()
export class DecoderService {
  private _definitions: {};

  constructor() {
  }

  decode(canFrame: CanFrame): CanFrameResult {
    if (!this._definitions || _.isEmpty(this.definitions)) {
      throw new Error('Definitions property is empty');
    }
    console.log('Decoding can frame', canFrame);

    if (!(canFrame.pgnDec in this.definitions)) {
      throw new Error('PGN is not found in the definitions');
    }

    let pgnDefintion = this.definitions[ canFrame.pgnDec ];

    return new CanFrameResult(pgnDefintion, canFrame, []);
  }

  // private _checkHex(v: string): boolean {
  //   return /^[0-9A-Fa-f]{1,64}$/.test(v);
  // }
  //
  // private _hex2Dec(v: string): string {
  //   if (!this._checkHex(v)) return '0';
  //   return parseInt(v, 16).toString(10);
  // }

  get definitions(): {} {
    return this._definitions;
  }

  set definitions(value: {}) {
    this._definitions = value;
  }
}
