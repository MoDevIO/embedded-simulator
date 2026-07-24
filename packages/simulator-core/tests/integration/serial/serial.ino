void setup() { Serial.begin(9600); }

void loop() {
  if (Serial.available() >= 3) {
    char buffer[4];

    buffer[0] = Serial.read();
    buffer[1] = Serial.read();
    buffer[2] = Serial.read();
    buffer[3] = '\0';

    if (strcmp(buffer, "123") == 0) {
      Serial.print("123");
    }
  }
}
