import { expect, test } from "vitest";
import { SimulatorTest } from "../_helpers/simulator-test";

test("Millis() is counting up", () => {
  const sim = new SimulatorTest("tests/integration/millis", "millis.ino.hex");

  sim.run();

  sim.simulator.addSerialListener((data) => {
    expect(data).toBe("1 second has passed!");
  });

  sim.stop();
});
