#include <WiFi.h>
#include <ESPAsyncWebServer.h>

const char* ssid = "HOTSPOT_4431";
const char* password = "";

AsyncWebServer server(80);

const int signalPin = 2;

void setup(){
  Serial.begin(115200);

  // Настройка пина как выходного
  pinMode(signalPin, OUTPUT);
  digitalWrite(signalPin, LOW);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
  Serial.println(WiFi.localIP());

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    digitalWrite(signalPin, HIGH);
    request->send(200, "text/plain", "Signal ON for 8 seconds");
    Serial.println("Signal ON for 8 seconds");
    delay(8000);
    digitalWrite(signalPin, LOW);
    Serial.println("Signal OFF");
  });
  server.begin();
}

void loop(){}
