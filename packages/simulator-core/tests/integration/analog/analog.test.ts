import { expect, test } from "vitest";
import { SimulatorTest } from "../_helpers/simulator-test";

test("Analog Input/Output", () => {
  const sim = new SimulatorTest("tests/integration/analog", "analog.ino.hex");

  sim.simulator.writePin("A0", 512);

  sim.run();

  expect(sim.simulator.readPin(9)).toBe(128);

  sim.stop();
});
