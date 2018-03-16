export class NumberConverter {

  static checkBin(n) {
    return /^[01]{1,64}$/.test(n);
  }

  static checkDec(n) {
    return /^[0-9]{1,64}$/.test(n);
  }

  static checkHex(n) {
    return /^[0-9A-Fa-f]{1,64}$/.test(n);
  }

  static pad(s, z) {
    s = '' + s;
    return s.length < z ? NumberConverter.pad('0' + s, z) : s;
  }

  static unpad(s) {
    s = '' + s;
    return s.replace(/^0+/, '');
  }

  // Decimal operations
  static Dec2Bin(n): string {
    if (!NumberConverter.checkDec(n) || n < 0) return '0';
    return n.toString(2);
  }

  static Dec2Hex(n): string {
    if (!NumberConverter.checkDec(n) || n < 0) return '0';
    return n.toString(16);
  }

  // Binary Operations
  static Bin2Dec(n): string {
    if (!NumberConverter.checkBin(n)) return '0';
    return parseInt(n, 2).toString(10);
  }

  static Bin2Hex(n): string {
    if (!NumberConverter.checkBin(n)) return '0';
    return parseInt(n, 2).toString(16);
  }

  // Hexadecimal Operations
  static Hex2Bin(n): string {
    if (!NumberConverter.checkHex(n)) return '0';
    return parseInt(n, 16).toString(2);
  }

  static Hex2Dec(n): string {
    if (!NumberConverter.checkHex(n)) return '0';
    return parseInt(n, 16).toString(10);
  }
}
