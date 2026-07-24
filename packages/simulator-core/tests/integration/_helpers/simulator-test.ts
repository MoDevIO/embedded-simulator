import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

import { Simulator } from "../../../src/simulator.js";
import { AVRCPU } from "../../../src/cpu/cpu-avr.js";
import { ArduinoUno } from "../../../src/gpio/boards/arduino-uno.js";

export class SimulatorTest {
  readonly simulator: Simulator;

  constructor(sketchPath: string, hexPath: string) {
    const args = [
      "compile",
      "--fqbn",
      "arduino:avr:uno",
      "--output-dir",
      `${sketchPath}/build`,
      sketchPath,
    ];
    execFileSync("arduino-cli", args);

    const hex = readFileSync(`${sketchPath}/build/${hexPath}`, "utf8");

    const board = new ArduinoUno();
    const cpu = new AVRCPU(board);
    this.simulator = new Simulator(cpu, board);
    this.simulator.loadFirmware(hex);
  }

  run() {
    this.simulator.start();
  }

  stop() {
    this.simulator.stop();
  }
}
