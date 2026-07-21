import type { CPU } from "./cpu";

export class AVRCPU implements CPU {
  private cycles: number = 0;

  loadFirmware(firmware: Uint8Array): void {
    firmware;
  }

  reset(): void {
    this.cycles = 0;
  }

  step(): void {
    this.cycles++;
  }

  getCycles(): number {
    return this.cycles;
  }

  getFrequency(): number {
    return 16_000_000;
  }
}
