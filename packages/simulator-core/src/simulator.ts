import { parse } from "intel-hex";

import type { CPU } from "./cpu/cpu.js";
import { Scheduler } from "./scheduler/scheduler.js";

export class Simulator {
  private scheduler: Scheduler;

  constructor(private cpu: CPU) {
    this.scheduler = new Scheduler(cpu);
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
