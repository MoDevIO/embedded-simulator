import { CPU } from "./cpu/cpu";
import { Scheduler } from "./scheduler/scheduler";

export class Simulator {
  private scheduler: Scheduler;

  constructor(private cpu: CPU) {
    this.scheduler = new Scheduler(cpu);
  }

  loadFirmware(firmware: Uint8Array) {
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
