import { Pgn } from './pgn';
import { CanFrame } from './can-frame';

export class CanFrameResult {
  private _definition: Pgn;
  private _canFrame: CanFrame;
  private _spnValues: any[];


  constructor(definition: Pgn, canFrame: CanFrame, spnValues: any[]) {
    this._definition = definition;
    this._canFrame   = canFrame;
    this._spnValues  = spnValues;
  }

  get definition(): Pgn {
    return this._definition;
  }

  set definition(value: Pgn) {
    this._definition = value;
  }

  get canFrame(): CanFrame {
    return this._canFrame;
  }

  set canFrame(value: CanFrame) {
    this._canFrame = value;
  }

  get spnValues(): any[] {
    return this._spnValues;
  }

  set spnValues(value: any[]) {
    this._spnValues = value;
  }
}
