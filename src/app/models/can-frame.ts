export class CanFrame {
  private _value: string;
  private _pgn: string;
  private _data: string[];

  constructor(canFrameStr: string) {
    console.log('Model constructed', canFrameStr);
    this.value = canFrameStr;
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    console.log('Setting value');
    this._value = value;
    let split = this._value.split('#');
    this.pgn = split[ 0 ];
    this.data = [];

  }

  get pgn(): string {
    return this._pgn;
  }

  set pgn(value: string) {
    this._pgn = value;
  }

  get data(): string[] {
    return this._data;
  }

  set data(value: string[]) {
    this._data = value;
  }
}
