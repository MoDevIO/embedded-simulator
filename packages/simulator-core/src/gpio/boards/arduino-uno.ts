import { GPIO } from "../gpio.js";
import { Port } from "../port.js";
import { Pin } from "../pin.js";
import { PinMode, PinType } from "../state.js";

type PinMapping = {
  digital: {
    [pinNumber: number]: { port: string; pin: number };
  };
  analog: {
    [pinName: string]: { port: string; pin: number };
  };
};

export class ArduinoUno {
  readonly gpio: GPIO;
  readonly pinMapping: PinMapping;

  constructor() {
    this.gpio = new GPIO([
      new Port("PortB", [
        new Pin(0, PinMode.Input, PinType.Digital),
        new Pin(1, PinMode.Input, PinType.Digital),
        new Pin(2, PinMode.Input, PinType.Digital),
        new Pin(3, PinMode.Input, PinType.Digital),
        new Pin(4, PinMode.Input, PinType.Digital),
        new Pin(5, PinMode.Input, PinType.Digital),
        new Pin(6, PinMode.Input, PinType.Digital),
        new Pin(7, PinMode.Input, PinType.Digital),
      ]),

      new Port("PortC", [
        new Pin(0, PinMode.Input, PinType.Digital),
        new Pin(1, PinMode.Input, PinType.Digital),
        new Pin(2, PinMode.Input, PinType.Digital),
        new Pin(3, PinMode.Input, PinType.Digital),
        new Pin(4, PinMode.Input, PinType.Digital),
        new Pin(5, PinMode.Input, PinType.Digital),
        new Pin(6, PinMode.Input, PinType.Digital),
      ]),

      new Port("PortD", [
        new Pin(0, PinMode.Input, PinType.Digital),
        new Pin(1, PinMode.Input, PinType.Digital),
        new Pin(2, PinMode.Input, PinType.Digital),
        new Pin(3, PinMode.Input, PinType.Digital),
        new Pin(4, PinMode.Input, PinType.Digital),
        new Pin(5, PinMode.Input, PinType.Digital),
        new Pin(6, PinMode.Input, PinType.Digital),
        new Pin(7, PinMode.Input, PinType.Digital),
      ]),
    ]);

    this.pinMapping = {
      digital: {
        0: { port: "PortD", pin: 0 }, // PD0 / RX
        1: { port: "PortD", pin: 1 }, // PD1 / TX
        2: { port: "PortD", pin: 2 }, // PD2
        3: { port: "PortD", pin: 3 }, // PD3 (PWM)
        4: { port: "PortD", pin: 4 }, // PD4
        5: { port: "PortD", pin: 5 }, // PD5 (PWM)
        6: { port: "PortD", pin: 6 }, // PD6 (PWM)
        7: { port: "PortD", pin: 7 }, // PD7
        8: { port: "PortB", pin: 0 }, // PB0
        9: { port: "PortB", pin: 1 }, // PB1 (PWM)
        10: { port: "PortB", pin: 2 }, // PB2 (PWM)
        11: { port: "PortB", pin: 3 }, // PB3 (PWM)
        12: { port: "PortB", pin: 4 }, // PB4
        13: { port: "PortB", pin: 5 }, // PB5 (Onboard LED)
      },
      analog: {
        A0: { port: "PortC", pin: 0 }, // PC0
        A1: { port: "PortC", pin: 1 }, // PC1
        A2: { port: "PortC", pin: 2 }, // PC2
        A3: { port: "PortC", pin: 3 }, // PC3
        A4: { port: "PortC", pin: 4 }, // PC4 (SDA)
        A5: { port: "PortC", pin: 5 }, // PC5 (SCL)
      },
    };
  }
}
