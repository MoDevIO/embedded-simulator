import { PinState, PinMode, PinType } from "./state.js";
import type { PinValue, PinCapabilities } from "./state.js";

export class Pin {
  readonly number: number;

  private type: PinType;
  private value: PinValue;
  private mode: PinMode;
  private capabilities: PinCapabilities;

  private listeners: ((value: PinValue) => void)[] = [];

  constructor(
    number: number,
    mode: PinMode,
    capabilities: PinCapabilities,
    type: PinType = PinType.Unassigned,
  ) {
    this.number = number;
    this.type = type;
    this.mode = mode;
    this.value = PinState.Low;
    this.capabilities = capabilities;
  }

  addListener(listener: (value: PinValue) => void): void {
    this.listeners.push(listener);
  }

  getCapabilities(): PinCapabilities {
    return this.capabilities;
  }

  getType(): PinType {
    return this.type;
  }

  getValue(): PinValue {
    return this.value;
  }

  getMode(): PinMode {
    return this.mode;
  }

  setMode(mode: PinMode): void {
    if (this.mode === mode) return;

    this.mode = mode;
  }

  setValue(value: PinValue): void {
    if (this.value === value) return;

    this.value = value;

    // Send event to listeners
    for (const listener of this.listeners) {
      listener(value);
    }
  }
}
