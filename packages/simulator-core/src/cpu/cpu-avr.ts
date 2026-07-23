import {
  CPU as AVRCore,
  avrInstruction,
  AVRIOPort,
  PinState as AVRPinState,
  portBConfig,
  portCConfig,
  portDConfig,
  AVRADC,
  adcConfig,
  AVRTimer,
  timer0Config,
  timer1Config,
  timer2Config,
} from "avr8js";

import type { CPU } from "./cpu.js";
import { GPIO } from "../gpio/gpio.js";
import { Port } from "../gpio/port.js";
import { PinState, PinValue } from "../gpio/state.js";
import { Board } from "../gpio/boards/board.js";

export class AVRCPU implements CPU {
  private cpu: AVRCore;
  private flash: Uint16Array;

  readonly gpio: GPIO;
  readonly board: Board;

  private adc: AVRADC;

  private portB: AVRIOPort;
  private portC: AVRIOPort;
  private portD: AVRIOPort;

  private timer0: AVRTimer;
  private timer1: AVRTimer;
  private timer2: AVRTimer;

  private bindPort(avrPort: AVRIOPort, gpioPort: Port): void {
    // AVR -> GPIO
    avrPort.addListener(() => {
      for (const pin of gpioPort.pins) {
        const state =
          avrPort.pinState(pin.number) === AVRPinState.High
            ? PinState.High
            : PinState.Low;
        pin.setValue(state);
      }
    });

    // GPIO -> AVR
    for (const pin of gpioPort.pins) {
      pin.addListener((state) => {
        const avrState = state === PinState.High;
        avrPort.setPin(pin.number, avrState);
      });
    }
  }

  constructor(board: Board) {
    const FLASH_SIZE = (32 * 1024) / 2; // 32KB flash size in words (16 bit)

    this.flash = new Uint16Array(FLASH_SIZE);

    this.cpu = new AVRCore(this.flash);

    this.board = board;
    this.gpio = board.gpio;

    this.adc = new AVRADC(this.cpu, adcConfig);

    this.portB = new AVRIOPort(this.cpu, portBConfig);
    this.portC = new AVRIOPort(this.cpu, portCConfig);
    this.portD = new AVRIOPort(this.cpu, portDConfig);

    this.timer0 = new AVRTimer(this.cpu, timer0Config);
    this.timer1 = new AVRTimer(this.cpu, timer1Config);
    this.timer2 = new AVRTimer(this.cpu, timer2Config);

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

  getPWM(port: string, pin: number) {
    const pwm = this.board.pwmPinMapping.find(
      (pwm) => pwm.port === port && pwm.pin === pin,
    );

    if (!pwm) {
      throw new Error(`Pin ${port}${pin} does not support PWM`);
    }

    const value = this.cpu.data[pwm.register];

    return {
      value,
      dutyCycle: value / pwm.max,
    };
  }

  read(port: string, pin: number): PinValue {
    const gpioPin = this.gpio.getPort(port).getPin(pin);
    if (gpioPin.getCapabilities().pwm) {
      return 404; // this is a placeholder and it is getting implemented later
    } else {
      const state = gpioPin.getValue();
      return state;
    }
  }

  write(port: string, pin: number, value: PinValue): void {
    const gpioPin = this.gpio.getPort(port).getPin(pin);
    if (gpioPin.getCapabilities().adc) {
      const voltage = ((value as number) * 5) / 1023; // Convert ADC value to voltage (0-5V)
      this.adc.channelValues[gpioPin.number] = voltage;
    } else {
      gpioPin.setValue(value);
    }
  }
}
