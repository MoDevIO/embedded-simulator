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
}

export type PinValue = PinState | number;
