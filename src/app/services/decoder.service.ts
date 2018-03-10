import { Injectable } from '@angular/core';

@Injectable()
export class DecoderService {
  constructor() {
  }

  decode(canFrame: string) {
    console.log('Decoding can frame', canFrame);
  }
}
