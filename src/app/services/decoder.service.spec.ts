import { DecoderService } from './decoder.service';
import { Pgn, Spn, SpnTypes } from '../models/pgn';

describe('DecoderService', () => {

  let definitions = {
    61444 : new Pgn(61444, 'Electronic Engine Controller 1', 8, 'Engine speed dependent', 'EEC1', [
      new Spn(899, 'Engine Torque Mode', '', SpnTypes.Status, '1.1', 4, 1, 0, 'bit', {
        '0000' : 'low idle governor/no request (default mode)',
        '1111' : 'not available',
      }),
      new Spn(4154, 'Actual Engine - Percent Torque High Resolution', '', SpnTypes.Measured, '1.5', 4, 0.125, 0, '%'),
      new Spn(512, 'Driver\'s Demand Engine - Percent Torque', '', SpnTypes.Measured, '2', 8, 1, -125, '%'),
      new Spn(513, 'Actual Engine - Percent Torque', '', SpnTypes.Measured, '3', 8, 1, -125, '%'),
      new Spn(190, 'Engine Speed', '', SpnTypes.Measured, '4', 16, 0.125, 0, 'rpm'),
      new Spn(1483, 'Source Address of Controlling Device for Engine Control', '', SpnTypes.Measured, '6', 8, 1, 0, 'SA'),
      new Spn(1675, 'Engine Starter Mode', '', SpnTypes.Status, '7.1', 4, 1, 0, 'bit', {
        '0000' : 'start not requested',
        '0001' : 'starter active, gear not engaged',
        '0010' : 'starter active, gear engaged',
        '0011' : 'start finished; starter not active after having been actively engaged (after 50ms mode goes to 0000)',
        '0100' : 'starter inhibited due to engine already running',
        '0101' : 'starter inhibited due to engine not ready for start (preheating)',
        '0110' : 'starter inhibited due to driveline engaged or other transmission inhibit',
        '0111' : 'starter inhibited due to active immobilizer',
        '1000' : 'starter inhibited due to starter over-temp',
        '1001' : 'Reserved',
        '1010' : 'Reserved',
        '1011' : 'Reserved',
        '1100' : 'starter inhibited - reason unknown',
        '1101' : 'error (legacy implementation only, use 1110)',
        '1110' : 'error',
        '1111' : 'not available',
      }),
      new Spn(2432, 'Engine Demand – Percent Torque', '', SpnTypes.Measured, '8', 8, 1, -125, '%'),
    ])
  };

  let service: DecoderService;
  beforeEach(() => {
    service = new DecoderService();
  });

  it('should be able to set definitions', () => {
    expect(service.definitions).toBeUndefined();
    service.definitions = definitions;

    expect(service.definitions).toBe(definitions);
  });
});
