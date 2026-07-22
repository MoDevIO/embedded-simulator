import { Pin } from "./pin.js";
import { PinMode, PinState } from "./state.js";

export class Port {
  readonly pins: Pin[];
  readonly name: string;

  constructor(name: string, pinCount: number) {
    this.name = name;

    this.pins = Array.from(
      { length: pinCount },
      (_, index) => new Pin(index, PinMode.Input),
    );
  }

  getPin(pinNumber: number): Pin {
    const pin = this.pins[pinNumber];

    if (!pin) {
      throw new Error(`Pin ${pinNumber} does not exist on port ${this.name}`);
    }

    return pin;
  }

  setPinMode(pinNumber: number, mode: PinMode): void {
    const pin = this.getPin(pinNumber);
    pin.setMode(mode);
  }

  setPinState(pinNumber: number, state: boolean): void {
    const pin = this.getPin(pinNumber);
    pin.setState(state ? PinState.High : PinState.Low);
  }
}
