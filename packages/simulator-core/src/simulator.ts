import { parse } from "intel-hex";

import type { CPU } from "./cpu/cpu.js";
import { Scheduler } from "./scheduler/scheduler.js";
import { GPIO } from "./gpio/gpio.js";
import { Board } from "./gpio/boards/board.js";
import { PinValue } from "./gpio/state.js";

export class Simulator {
  private scheduler: Scheduler;

  readonly gpio: GPIO;
  readonly cpu: CPU;
  readonly board: Board;

  constructor(cpu: CPU, board: Board) {
    this.scheduler = new Scheduler(cpu);

    this.cpu = cpu;
    this.gpio = cpu.gpio;
    this.board = board;
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

  readPin(pin: number | `A${number}`): PinValue {
    const mapping =
      this.board.pinMapping.digital[pin as number] ??
      this.board.pinMapping.analog[pin];

    if (!mapping) {
      throw new Error(`Pin ${pin} does not exist`);
    }

    return this.gpio.read(mapping.port, mapping.pin);
  }

  writePin(pin: number | `A${number}`, value: PinValue): void {
    const mapping =
      this.board.pinMapping.digital[pin as number] ??
      this.board.pinMapping.analog[pin];

    if (!mapping) {
      throw new Error(`Pin ${pin} does not exist`);
    }

    this.gpio.write(mapping.port, mapping.pin, value);
  }
}
