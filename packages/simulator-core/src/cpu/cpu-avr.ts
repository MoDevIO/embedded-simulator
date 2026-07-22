import { CPU as AVRCore, avrInstruction } from "avr8js";

import type { CPU } from "./cpu.js";
import { GPIO } from "../gpio/gpio.js";
import { Port } from "../gpio/port.js";

export class AVRCPU implements CPU {
  private cpu: AVRCore;
  private flash: Uint16Array;

  readonly gpio: GPIO;

  constructor() {
    const FLASH_SIZE = (32 * 1024) / 2; // 32KB flash size in words (16 bit)

    this.flash = new Uint16Array(FLASH_SIZE);

    this.cpu = new AVRCore(this.flash);

    this.gpio = new GPIO([
      new Port("PortB", 8),
      new Port("PortC", 7),
      new Port("PortD", 8),
    ]);
  }

  loadFirmware(firmware: Uint8Array): void {
    this.flash.set(
      new Uint16Array(
        firmware.buffer,
        firmware.byteOffset,
        Math.floor(firmware.byteLength / 2),
      ),
    );
  }

  reset(): void {
    this.cpu.reset();
  }

  step(): void {
    avrInstruction(this.cpu);
    this.cpu.tick();
  }

  getCycles(): number {
    return this.cpu.cycles;
  }

  getFrequency(): number {
    return 16_000_000; // 16 MHz
  }
}
