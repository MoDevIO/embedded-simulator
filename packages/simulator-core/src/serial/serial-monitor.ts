import { CPU } from "../cpu/cpu.js";

export class SerialMonitor {
  private buffer: string = "";
  private cpu: CPU;

  private callbacks: ((data: string) => void)[] = [];

  constructor(cpu: CPU) {
    this.cpu = cpu;

    if (!cpu.usart) {
      throw new Error("CPU does not have a USART");
    }

    cpu.usart.onByteTransmit = (byte: number) => {
      const char = String.fromCharCode(byte);

      this.buffer += char;

      if (char === "\n") {
        const line = this.buffer.trim();

        this.callbacks.forEach((callback) => callback(line));
        this.buffer = "";
      }
    };
  }

  onData(callback: (data: string) => void) {
    this.callbacks.push(callback);
  }

  write(data: string) {
    if (!this.cpu.usart) {
      throw new Error("CPU does not have a USART");
    }

    for (const char of data) {
      this.cpu.usart.writeByte(char.charCodeAt(0));
    }
  }
}
