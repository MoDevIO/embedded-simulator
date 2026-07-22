import type { CPU } from "../cpu/cpu.js";

export class Scheduler {
  private running: boolean = false;
  private stepsPerCycle: number = 500000;

  constructor(private cpu: CPU) {}

  start() {
    this.running = true;
    this.loop();
  }

  stop() {
    this.running = false;
  }

  private loop() {
    if (!this.running) return;

    for (let i = 0; i < this.stepsPerCycle; i++) {
      this.cpu.step();
    }

    setTimeout(() => this.loop(), 0);
  }
}
