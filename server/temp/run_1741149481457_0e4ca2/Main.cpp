#include <iostream>
#include <thread>
#include <mutex>

std::mutex mtx;

void printMessage(int id) {
    std::lock_guard<std::mutex> lock(mtx);
    std::cout << "Thread " << id << " is running\n";
}

int main() {
    std::thread t1(printMessage, 1);
    std::thread t2(printMessage, 2);
    t1.join();
    t2.join();
    return 0;
}