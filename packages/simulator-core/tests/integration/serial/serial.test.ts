import { expect, test } from "vitest";
import { SimulatorTest } from "../_helpers/simulator-test";

test("Serial Read/Write", () => {
  const sim = new SimulatorTest("tests/integration/gpio", "gpio.ino.hex");

  sim.run();

  sim.simulator.sendSerialData("123");

  sim.simulator.addSerialListener((data) => {
    expect(data).toBe("123");
  });

  sim.stop();
});
