import { parse } from "intel-hex";

import type { CPU } from "./cpu/cpu.js";
import { Scheduler } from "./scheduler/scheduler.js";
import { GPIO } from "./gpio/gpio.js";

export class Simulator {
  private scheduler: Scheduler;

  readonly gpio: GPIO;
  readonly cpu: CPU;

  constructor(cpu: CPU) {
    this.scheduler = new Scheduler(cpu);

    this.cpu = cpu;
    this.gpio = cpu.gpio;
  }

  loadFirmware(hex: string): void {
    const result = parse(hex);

    const firmware = new Uint8Array(result.data);

    this.cpu.loadFirmware(firmware);
  }

  start() {
    this.cpu.reset();
    this.scheduler.start();
  }

  stop() {
    this.scheduler.stop();
  }

  resume() {
    this.scheduler.start();
  }

  reset() {
    this.cpu.reset();
  }

  step() {
    this.cpu.step();
  }
}
