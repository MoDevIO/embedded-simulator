export enum PinState {
  Low = 0,
  High = 1,
}

export enum PinMode {
  Input,
  Output,
  InputPullup,
}

export enum PinType {
  Digital,
  Analog,
  Unassigned,
}

export type PinCapabilities = {
  digital: boolean;
  adc: boolean;
  pwm: boolean;
};

export type PinValue = PinState | number;
