import { Port } from "./port.js";

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
}
