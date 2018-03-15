export class CanFrame {
  private _value: string = '';
  private _messageId: string = '';
  private _messageBody: string = '';
  private _pgn: string = '';
  private _pgnDec: number = 0;
  private _data: string[] = [];

  constructor(canFrameStr: string) {
    this.value = canFrameStr;
  }

  private _extractStr() {
    this._resetModel();

    let split        = this._value.split('#');
    this.messageId   = split[ 0 ];
    this.messageBody = split[ 1 ];

    this.pgn = this.messageId.slice(2, 6);
    this.pgnDec = this._hex2Dec(this.pgn);

    for (let i = 0; i < this.messageBody.length; i += 2) {
      this.data.push(this.messageBody.substr(i, 2));
    }
  }

  private _checkHex(v: string): boolean {
    return /^[0-9A-Fa-f]{1,64}$/.test(v);
  }

  private _hex2Dec(v: string): number {
    if (!this._checkHex(v)) return 0;
    return parseInt(v, 16);
  }

  private _resetModel() {
    this.messageId = '';
    this.messageBody = '';
    this.pgn = '';
    this.pgnDec = 0;
    this.data = [];
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    if (value.split('#').length !== 2) {
      throw new Error(`Incorrect format for CAN Frame value: "${value}"`);
    }
    this._value = value;
    this._extractStr();
  }

  get messageId(): string {
    return this._messageId;
  }

  set messageId(value: string) {
    this._messageId = value;
  }

  get messageBody(): string {
    return this._messageBody;
  }

  set messageBody(value: string) {
    this._messageBody = value;
  }

  get pgn(): string {
    return this._pgn;
  }

  set pgn(value: string) {
    this._pgn = value;
  }

  get pgnDec(): number {
    return this._pgnDec;
  }

  set pgnDec(value: number) {
    this._pgnDec = value;
  }

  get data(): string[] {
    return this._data;
  }

  set data(value: string[]) {
    this._data = value;
  }
}
