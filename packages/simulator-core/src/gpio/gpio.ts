import { Port } from "./port.js";
import { PinValue } from "./state.js";

export class GPIO {
  readonly ports: Port[];

  constructor(ports: Port[]) {
    this.ports = ports;
  }

  getPort(portName: string): Port {
    const port = this.ports.find((p) => p.name === portName);

    if (!port) {
      throw new Error(`Port ${portName} does not exist`);
    }

    return port;
  }

  read(portName: string, pinNumber: number): PinValue {
    const port = this.getPort(portName);
    const pin = port.getPin(pinNumber);

    return pin.getValue();
  }

  write(portName: string, pinNumber: number, value: PinValue): void {
    const port = this.getPort(portName);
    const pin = port.getPin(pinNumber);

    pin.setValue(value);
  }
}
