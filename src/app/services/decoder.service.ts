import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {CanFrame} from '../models/can-frame';
import {CanFrameResult} from '../models/can-frame-result';
import {Spn} from '../models/pgn';

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

    let pgnDefinition = this.definitions[canFrame.pgnDec];

    let spnValues = this.getSpnValues(pgnDefinition.spns, canFrame.data);

    return new CanFrameResult(pgnDefinition, canFrame, spnValues);
  }

  getSpnValues(spns: Array<Spn>, messageByteArray: Array<string>): {} {
    let result = {};

    for (let i = 0; i < spns.length; i++) {
      let rawData = this._getSpnRawData(spns[i], messageByteArray);
      let rawValue = this._calculateRawSpnValue(rawData);
      let spn = spns[i];
      result[spn.number] = {
        rawData: rawData,
        rawValue: rawValue,
        actualValue: this._calculateActualSpnValue(rawValue, spn)
      };
    }

    return result;
  }

  private _getSpnRawData(spn: Spn, messageByteArray: Array<string>) {
    let byteStart = parseInt(spn.bytePosition, 10);
    return messageByteArray.slice(byteStart - 1, (byteStart - 1) + (spn.bitLength / 8));
  }

  private _calculateRawSpnValue(rawDataArray: Array<string>) {
    let result = 0;
    for (let i = 0; i < rawDataArray.length; i++) {
      result += parseInt(rawDataArray[i], 16) * Math.pow(2, (8 * i));
    }
    return result;
  }

  private _calculateActualSpnValue(rawValue, spn: Spn) {
    if (rawValue === 255) {
      return 'No Data';
    }
    if (rawValue === 254) {
      return 'Error';
    }
    return ((rawValue * spn.resolution) + spn.offset) + ' ' + spn.units;
  }

  get definitions(): {} {
    return this._definitions;
  }

  set definitions(value: {}) {
    this._definitions = value;
  }
}
