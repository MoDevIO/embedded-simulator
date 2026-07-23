import { GPIO } from "../gpio.js";

export interface Board {
  readonly gpio: GPIO;
  readonly pinMapping: {
    digital: {
      [pinNumber: number]: { port: string; pin: number };
    };
    analog: {
      [pinName: string]: { port: string; pin: number };
    };
  };
  readonly pwmPinMapping: {
    port: string;
    pin: number;
    timer: "timer0" | "timer1" | "timer2";
    register: number;
    max: number;
  }[];
}
