import type { CPU } from "./cpu";

export class AVRCPU implements CPU {
  loadFirmware(firmware: Uint8Array): void {
    firmware;
  }

  reset(): void {
    //
  }

  step(): void {
    //
  }

  getCycles(): number {
    return 0;
  }

  getFrequency(): number {
    return 16_000_000;
  }
}
