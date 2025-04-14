import threading

class TrafficLight:
    def __init__(self):
        self.light = 1  # Initially, road 1 has the green light
        self.lock = threading.Lock()
    
    def car_arrived(self, car_id, road_id, direction, turn_green, cross_car):
        with self.lock:
            if self.light != road_id:  # If light is not green on the current road, switch it
                turn_green()
                self.light = road_id
            cross_car()

def read_int_array(size, name):
    values = list(map(int, input().strip().split()))
    if len(values) != size:
        print(f"Error: Expected {size} elements for {name}, but got {len(values)}")
        exit(1)
    return values

def main():
    # Number of test cases
    T = int(input())
    
    # Process each test case
    for _ in range(T):
        # Test case label
        test_case_label = input().strip()
        print(test_case_label)
        
        # Number of cars
        n = int(input())
        
        # Read cars, directions, and arrival times
        cars = read_int_array(n, "cars")
        n = int(input())
        directions = read_int_array(n, "directions")
        n = int(input())
        arrival_times = read_int_array(n, "arrival times")
        
        # Process cars
        traffic_light = TrafficLight()
        for i in range(n):
            car_id = cars[i]
            direction = directions[i]
            road_id = 1 if direction in [1, 2] else 2
            
            traffic_light.car_arrived(
                car_id, road_id, direction,
                lambda road_id=road_id: print(f"Traffic Light On Road {road_id} Is Green"),
                lambda car_id=car_id, road_id=road_id, direction=direction: 
                    print(f"Car {car_id} Has Passed Road {'A' if road_id == 1 else 'B'} In Direction {direction}")
            )

if __name__ == "__main__":
    main()