export interface CPU {
  loadFirmware(firmware: Uint8Array): void;

  reset(): void;

  step(): void;

  getCycles(): number;

  getFrequency(): number;
}
