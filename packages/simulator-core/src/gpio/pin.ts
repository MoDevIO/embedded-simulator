import { PinState, PinMode } from "./state.js";

export class Pin {
  readonly number: number;

  private state: PinState;
  private mode: PinMode;
  private listeners: ((state: PinState) => void)[] = [];

  constructor(number: number, mode: PinMode) {
    this.number = number;
    this.mode = mode;
    this.state = PinState.Low;
  }

  addListener(listener: (state: PinState) => void): void {
    this.listeners.push(listener);
  }

  getState(): PinState {
    return this.state;
  }

  getMode(): PinMode {
    return this.mode;
  }

  setMode(mode: PinMode): void {
    if (this.mode === mode) return;

    this.mode = mode;
  }

  setState(state: PinState): void {
    if (this.state === state) return;

    this.state = state;

    // Send event to listeners
    for (const listener of this.listeners) {
      listener(state);
    }
  }
}
