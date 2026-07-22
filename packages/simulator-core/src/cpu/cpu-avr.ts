import {
  CPU as AVRCore,
  avrInstruction,
  AVRIOPort,
  PinState as AVRPinState,
  portBConfig,
  portCConfig,
  portDConfig,
} from "avr8js";

import type { CPU } from "./cpu.js";
import { GPIO } from "../gpio/gpio.js";
import { Port } from "../gpio/port.js";
import { PinState } from "../gpio/state.js";

export class AVRCPU implements CPU {
  private cpu: AVRCore;
  private flash: Uint16Array;

  readonly gpio: GPIO;

  private portB: AVRIOPort;
  private portC: AVRIOPort;
  private portD: AVRIOPort;

  private bindPort(avrPort: AVRIOPort, gpioPort: Port): void {
    avrPort.addListener(() => {
      for (const pin of gpioPort.pins) {
        const state =
          avrPort.pinState(pin.number) === AVRPinState.High
            ? PinState.High
            : PinState.Low;
        pin.setState(state);
      }
    });
  }

  constructor() {
    const FLASH_SIZE = (32 * 1024) / 2; // 32KB flash size in words (16 bit)

    this.flash = new Uint16Array(FLASH_SIZE);

    this.cpu = new AVRCore(this.flash);

    this.gpio = new GPIO([
      new Port("PortB", 8),
      new Port("PortC", 7),
      new Port("PortD", 8),
    ]);

    this.portB = new AVRIOPort(this.cpu, portBConfig);
    this.portC = new AVRIOPort(this.cpu, portCConfig);
    this.portD = new AVRIOPort(this.cpu, portDConfig);

    // Connect GPIO ports to AVR ports
    // this.portB.addListener(() => {
    //   const pin5 = this.gpio.getPort("PortB").getPin(5);
    //   const pin5State =
    //     this.portB.pinState(5) === AVRPinState.High
    //       ? PinState.High
    //       : PinState.Low;
    //
    //   pin5.setState(pin5State);
    // });

    this.bindPort(this.portB, this.gpio.getPort("PortB"));
    this.bindPort(this.portC, this.gpio.getPort("PortC"));
    this.bindPort(this.portD, this.gpio.getPort("PortD"));
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
