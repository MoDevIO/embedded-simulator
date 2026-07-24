import { expect, test } from "vitest";
import { SimulatorTest } from "../_helpers/simulator-test";

test("GPIO Input/Output", () => {
  const sim = new SimulatorTest("tests/integration/gpio", "gpio.ino.hex");

  sim.simulator.writePin(2, 1);
  sim.simulator.writePin(3, 1);

  sim.run();

  expect(sim.simulator.readPin(13)).toBe(1);
  expect(sim.simulator.readPin(12)).toBe(0);

  sim.stop();
});
