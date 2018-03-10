export class Pgn {

  constructor(public number: number,
              public name: string,
              public length: number,
              public transmissionRate: string,
              public acronym: string,
              public spns: Array<Spn>) {
  }

}

export class Spn {

  constructor(public number: number,
              public name: string,
              public description: string,
              public bytePosition: string,
              public bitLength: number,
              public resolution: string,
              public offset: number,
              public units: string) {
  }
}
