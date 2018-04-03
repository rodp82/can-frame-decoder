import { Spn } from './spn';

export class Pgn {

  constructor(public number: number,
              public name: string,
              public length: number,
              public transmissionRate: string,
              public acronym: string,
              public spns: Array<Spn>) {
  }

}
