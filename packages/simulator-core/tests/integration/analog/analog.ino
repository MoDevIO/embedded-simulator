void setup() {
  pinMode(A0, INPUT);
  pinMode(9, OUTPUT);
}
void loop() {
  int value = analogRead(A0);
  analogWrite(9, value / 4);
}
