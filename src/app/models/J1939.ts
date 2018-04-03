import { Pgn } from './pgn';
import { Spn, SpnTypes } from './spn';

export const PGNS = {
  61442 : new Pgn(61442, 'Electronic Transmission Controller 1', 8, '10 ms', 'ETC1', [
    new Spn(560, 'Transmission Driveline Engaged', '', SpnTypes.Status, '1.1', 2, 1, 0, 'bit', {
      '00' : 'Driveline disengaged',
      '01' : 'Driveline engaged',
      '10' : 'Error',
      '11' : 'Not available',
    }),
    new Spn(573, 'Transmission Torque Converter Lockup Engaged', '', SpnTypes.Status, '1.3', 2, 1, 0, 'bit', {
      '00' : 'Torque converter lockup disengaged',
      '01' : 'Torque converter lockup engaged',
      '10' : 'Error',
      '11' : 'Not available',
    }),
    new Spn(574, 'Transmission Shift In Process', '', SpnTypes.Status, '1.5', 2, 1, 0, 'bit', {
      '00' : 'Shift is not in process',
      '01' : 'Shift in process',
      '10' : 'Error',
      '11' : 'Not available',
    }),
    new Spn(191, 'Transmission Output Shaft Speed', '', SpnTypes.Measured, '2', 16, 0.125, 0, 'rpm'),
    new Spn(522, 'Percent Clutch Slip', '', SpnTypes.Measured, '4', 8, 0.4, 0, '%'),
    new Spn(606, 'Engine Momentary Overspeed Enable', '', SpnTypes.Status, '5.1', 2, 1, 0, 'bit', {
      '00' : 'Momentary engine overspeed is disabled',
      '01' : 'Momentary engine overspeed is enabled',
      '10' : 'Reserved',
      '11' : 'Take no action',
    }),
    new Spn(607, 'Progressive Shift Disable', '', SpnTypes.Status, '5.3', 2, 1, 0, 'bit', {
      '00' : 'Progressive shift is not disabled',
      '01' : 'Progressive shift is disabled',
      '10' : 'Reserved',
      '11' : 'Take no action',
    }),
    new Spn(161, 'Transmission Input Shaft Speed', '', SpnTypes.Measured, '6', 16, 0.125, 0, 'rpm'),
    new Spn(1482, 'Source Address of Controlling Device for Transmission Control', '', SpnTypes.Measured, '8', 8, 1, 0, 'SA'),
  ]),
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
