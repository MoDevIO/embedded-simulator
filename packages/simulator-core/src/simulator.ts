import { parse } from "intel-hex";

import type { CPU } from "./cpu/cpu.js";
import { Scheduler } from "./scheduler/scheduler.js";
import { GPIO } from "./gpio/gpio.js";
import { Board } from "./gpio/boards/board.js";
import { SerialMonitor } from "./serial/serial-monitor.js";
import { PinValue } from "./gpio/state.js";

export class Simulator {
  private scheduler: Scheduler;
  readonly serialMonitor: SerialMonitor;

  readonly gpio: GPIO;
  readonly cpu: CPU;
  readonly board: Board;

  constructor(cpu: CPU, board: Board) {
    this.scheduler = new Scheduler(cpu);

    this.cpu = cpu;
    this.gpio = cpu.gpio;
    this.board = board;

    this.serialMonitor = new SerialMonitor(cpu);
  }

  loadFirmware(hex: string): void {
    const result = parse(hex);

    const firmware = new Uint8Array(result.data);

    this.cpu.loadFirmware(firmware);
  }

  start(timeout?: number) {
    this.cpu.reset();
    this.scheduler.start();
    if (timeout) {
      setTimeout(() => {
        this.scheduler.stop();
      }, timeout);
    }
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
      this.board.pinMapping.analog[pin as `A${number}`];

    if (!mapping) {
      throw new Error(`Pin ${pin} does not exist`);
    }

    return this.cpu.read(mapping.port, mapping.pin);
  }

  writePin(pin: number | `A${number}`, value: PinValue): void {
    const mapping =
      this.board.pinMapping.digital[pin as number] ??
      this.board.pinMapping.analog[pin as `A${number}`];

    if (!mapping) {
      throw new Error(`Pin ${pin} does not exist`);
    }

    this.cpu.write(mapping.port, mapping.pin, value);
  }

  addSerialListener(callback: (data: string) => void): void {
    this.serialMonitor.onData(callback);
  }

  sendSerialData(data: string): void {
    this.serialMonitor.write(data);
  }
}
