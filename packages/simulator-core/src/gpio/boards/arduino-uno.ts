import { GPIO } from "../gpio.js";
import { Port } from "../port.js";
import { Pin } from "../pin.js";
import { PinMode } from "../state.js";
import { Board } from "./board.js";

export class ArduinoUno implements Board {
  readonly gpio: GPIO;
  readonly pinMapping;
  readonly pwmPinMapping;

  constructor() {
    // prettier-ignore
    this.gpio = new GPIO([
      new Port("PortB", [
        new Pin(0, PinMode.Input, { digital: true, adc: false, pwm: false }, ), // D8
        new Pin(1, PinMode.Input, { digital: true, adc: false, pwm: true  }), // D9
        new Pin(2, PinMode.Input, { digital: true, adc: false, pwm: true  }), // D10
        new Pin(3, PinMode.Input, { digital: true, adc: false, pwm: true  }), // D11
        new Pin(4, PinMode.Input, { digital: true, adc: false, pwm: false }), // D12
        new Pin(5, PinMode.Input, { digital: true, adc: false, pwm: false }), // D13
        new Pin(6, PinMode.Input, { digital: false, adc: false, pwm: false }), // XTAL1
        new Pin(7, PinMode.Input, { digital: false, adc: false, pwm: false }), // XTAL2
      ]),

      new Port("PortC", [
        new Pin(0, PinMode.Input, { digital: true, adc: true, pwm: false }), // A0 / D14
        new Pin(1, PinMode.Input, { digital: true, adc: true, pwm: false }), // A1 / D15
        new Pin(2, PinMode.Input, { digital: true, adc: true, pwm: false }), // A2 / D16
        new Pin(3, PinMode.Input, { digital: true, adc: true, pwm: false }), // A3 / D17
        new Pin(4, PinMode.Input, { digital: true, adc: true, pwm: false }), // A4 / D18 / SDA
        new Pin(5, PinMode.Input, { digital: true, adc: true, pwm: false }), // A5 / D19 / SCL
        new Pin(6, PinMode.Input, { digital: false, adc: false, pwm: false }), // RESET
      ]),

      new Port("PortD", [
        new Pin(0, PinMode.Input, { digital: true, adc: false, pwm: false }), // D0
        new Pin(1, PinMode.Input, { digital: true, adc: false, pwm: false }), // D1
        new Pin(2, PinMode.Input, { digital: true, adc: false, pwm: false }), // D2
        new Pin(3, PinMode.Input, { digital: true, adc: false, pwm: true  }), // D3
        new Pin(4, PinMode.Input, { digital: true, adc: false, pwm: false }), // D4
        new Pin(5, PinMode.Input, { digital: true, adc: false, pwm: true  }), // D5
        new Pin(6, PinMode.Input, { digital: true, adc: false, pwm: true  }), // D6
        new Pin(7, PinMode.Input, { digital: true, adc: false, pwm: false }), // D7
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

    this.pwmPinMapping = [
      {
        port: "PortD",
        pin: 3,
        timer: "timer2",
        ocrRegister: 0xb4,
        controlRegister: 0xb0,
        comBit: 5,
      },
      {
        port: "PortD",
        pin: 5,
        timer: "timer0",
        ocrRegister: 0x48,
        controlRegister: 0x44,
        comBit: 5,
      },
      {
        port: "PortD",
        pin: 6,
        timer: "timer0",
        ocrRegister: 0x47,
        controlRegister: 0x44,
        comBit: 7,
      },
      {
        port: "PortB",
        pin: 1,
        timer: "timer1",
        ocrRegister: 0x88,
        controlRegister: 0x80,
        comBit: 7,
      },
      {
        port: "PortB",
        pin: 2,
        timer: "timer1",
        ocrRegister: 0x8a,
        controlRegister: 0x80,
        comBit: 5,
      },
      {
        port: "PortB",
        pin: 3,
        timer: "timer2",
        ocrRegister: 0xb3,
        controlRegister: 0xb0,
        comBit: 7,
      },
    ];
  }
}
