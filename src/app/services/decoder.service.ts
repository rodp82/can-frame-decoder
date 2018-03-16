import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {CanFrame} from '../models/can-frame';
import {CanFrameResult} from '../models/can-frame-result';
import {Spn, SpnTypes} from '../models/pgn';
import {NumberConverter} from './number-converter.service';

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
      let spn = spns[i];
      let rawData = this._getSpnRawData(spn, messageByteArray);
      let rawValue = this._calculateRawSpnValue(rawData, spn);
      result[spn.number] = {
        rawData: rawData,
        rawValue: rawValue,
        actualValue: this._calculateActualSpnValue(rawValue, spn)
      };
    }

    return result;
  }

  private _getSpnRawData(spn: Spn, messageByteArray: Array<string>): Array<string> {

    let result = [];
    let byteStart = 0;
    switch (spn.bitLength) {
      case 1:
        break;

      case 2:
        break;

      case 4:
        let posSplit = spn.bytePosition.split('.');
        byteStart = parseInt(posSplit[0], 10);
        let bitPos = parseInt(posSplit[1], 10);

        let byte = messageByteArray[byteStart - 1];
        let data = (bitPos === 5) ? byte[1] : byte[0];
        if (spn.type === SpnTypes.Status) {
          result = NumberConverter.Hex2Bin(data).split('');
        } else {
          result = [data];
        }

        break;

      case 8:
      case 16:
        byteStart = parseInt(spn.bytePosition, 10);
        result = messageByteArray.slice(byteStart - 1, (byteStart - 1) + (spn.bitLength / 8));
        break;

      default:
        throw new Error('not implemented');
    }

    return result;
  }

  private _calculateRawSpnValue(rawDataArray: Array<string>, spn: Spn) {
    let result;

    if (spn.type === SpnTypes.Status) {
      result = rawDataArray.join('');
    } else {
      result = 0;
      for (let i = 0; i < rawDataArray.length; i++) {
        result += parseInt(rawDataArray[i], 16) * Math.pow(2, (8 * i));
      }
    }
    return result;
  }

  private _calculateActualSpnValue(rawValue, spn: Spn) {
    if (spn.type === SpnTypes.Status) {
      return spn.statuses[rawValue];
    }
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
