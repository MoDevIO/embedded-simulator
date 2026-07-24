void setup() {
  Serial.begin(9600);

  pinMode(13, OUTPUT);
  pinMode(2, INPUT);

  pinMode(12, OUTPUT);
  pinMode(3, INPUT);
}
void loop() {
  if (digitalRead(2) == HIGH) {
    digitalWrite(13, HIGH);
  } else {
    digitalWrite(13, LOW);
  }

  if (digitalRead(3) == LOW) {
    digitalWrite(12, HIGH);
  } else {
    digitalWrite(12, LOW);
  }
}
