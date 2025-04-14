#include <iostream>
#include <vector>
#include <functional>
#include <mutex>  // Ensure this is included

using namespace std;

class TrafficLight {
public:
    std::mutex m; // Use std::mutex explicitly
    int light = 1; // Which light is currently on

    TrafficLight() {}

    void carArrived(int carId, int roadId, int direction, function<void()> turnGreen, function<void()> crossCar) {
        std::lock_guard<std::mutex> lock(m); // Explicitly use std::mutex
        if (light != roadId) { // If the light is not green on the current road, switch it
            turnGreen();
            light = roadId;
        }
        crossCar();
    }
};

void turnGreen(int roadId) {
    cout << "Traffic Light On Road " << roadId << " Is Green" << endl;
}

void crossCar(int carId, int roadId, int direction) {
    cout << "Car " << carId << " Has Passed Road " << (roadId == 1 ? "A" : "B") << " In Direction " << direction << endl;
}

int main() {
    int T;
    cin >> T; // Number of test cases

    while (T--) {
        int n;
        cin >> n; // Number of cars
        
        vector<int> cars(n), directions(n), arrivalTimes(n);
        for (int i = 0; i < n; i++) cin >> cars[i];
        for (int i = 0; i < n; i++) cin >> directions[i];
        for (int i = 0; i < n; i++) cin >> arrivalTimes[i];
        
        TrafficLight trafficLight;
        
        for (int i = 0; i < n; i++) {
            int carId = cars[i];
            int direction = directions[i];
            int roadId = (direction == 1 || direction == 2) ? 1 : 2;
            
            trafficLight.carArrived(carId, roadId, direction, 
                [&]() { turnGreen(roadId); },
                [&]() { crossCar(carId, roadId, direction); }
            );
        }
    }
    return 0;
}