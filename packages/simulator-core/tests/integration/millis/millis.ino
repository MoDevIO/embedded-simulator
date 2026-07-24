unsigned long startValue;

void setup() {
  startValue = millis();
  Serial.begin(9600);
}

void loop() {
  int currentValue = millis();
  if (currentValue - startValue >= 1000) {
    Serial.println("1 second has passed");
    startValue = currentValue;
  }
}
