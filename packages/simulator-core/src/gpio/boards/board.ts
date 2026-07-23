import { GPIO } from "../gpio.js";

type PinMapping = {
  digital: {
    [pinNumber: number]: { port: string; pin: number };
  };
  analog: {
    [pinName: `A${number}`]: { port: string; pin: number };
  };
};

type PWMPinMapping = {
  port: string;
  pin: number;
  timer: string;
  ocrRegister: number;
  controlRegister: number;
  comBit: number;
};

export interface Board {
  readonly gpio: GPIO;
  readonly pinMapping: PinMapping;
  readonly pwmPinMapping: PWMPinMapping[];
}
