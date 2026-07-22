import { GPIO } from "../gpio/gpio.js";

export interface CPU {
  gpio: GPIO;

  loadFirmware(firmware: Uint8Array): void;

  reset(): void;

  step(): void;

  getCycles(): number;

  getFrequency(): number;
}
