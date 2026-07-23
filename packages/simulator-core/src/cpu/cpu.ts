import { GPIO } from "../gpio/gpio.js";
import { PinValue } from "../gpio/state.js";

export interface CPU {
  gpio: GPIO;

  loadFirmware(firmware: Uint8Array): void;

  reset(): void;

  step(): void;

  getCycles(): number;

  getFrequency(): number;

  read(port: string, pin: number): PinValue;

  write(port: string, pin: number, value: number): void;
}
