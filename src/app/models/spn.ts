export enum SpnTypes {
  Status   = 'Status',
  Measured = 'Measured'
}

export class Spn {

  constructor(public number: number,
              public name: string,
              public description: string,
              public type: SpnTypes,
              public bytePosition: string,
              public bitLength: number,
              public resolution: number,
              public offset: number,
              public units: string,
              public statuses: {} = {}) {
  }

}
